const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//model import
const User = require("../models/User");

//validation import
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const key = require("../config/keys").secret;

const router = new require("express").Router();

//@route GET /api/users/test
//@desc test route
//@access public
router.get("/test", (req, res) => res.json({ msg: "Users test" }));

//@route POST /api/users/register
//@desc register user
//@access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST /api/users/login
//@desc login user
//@access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              name: user.name,
              id: user.id
            };

            jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
              res.json({ success: true, token: "Bearer " + token });
            });
          } else {
            errors.password = "Incorrect password";
            return res.status(400).json(errors);
          }
        });
      } else {
        const errors = { email: "Email not found" };
        return res.status(404).json(errors);
      }
    })
    .catch(error => {
      const errors = { email: "Email not found" };
      return res.status(400).json(errors);
    });
});

//@route POST /api/users/books/new
//@desc add new book
//@access private
router.post(
  "/books/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const newBook = {
          title: req.body.title,
          author: req.body.author,
          status: "future",
          rating: 0
        };
        user.books.push(newBook);
        user
          .save()
          .then(user => res.json(user.books))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//@route GET /api/users/books
//@desc get books
//@access private
router.get(
  "/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const payload = user.books;
        return res.json(payload);
      })
      .catch(err => console.log(err));
  }
);

//@route DELETE /api/users/books/:id
//@desc delete a book
//@access private
router.delete(
  "/books/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const newBooks = user.books.filter(
          book => book._id.toString() !== req.params.id
        );
        user.books = newBooks;
        user
          .save()
          .then(user => res.json(user.books))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//@route POST /api/users/books/:id
//@desc change book status
//@access private
router.post(
  "/books/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const book = user.books.filter(
          book => book._id.toString() === req.params.id
        )[0];

        user.books = user.books.filter(
          book => book._id.toString() !== req.params.id
        );

        const newBook = {
          title: book.title,
          author: book.author,
          status: req.body.status,
          rating: 0
        };

        user.books.push(newBook);

        user
          .save()
          .then(user => res.json(user.books))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//@route POST /api/users/books/rating/:id
//@desc change book rating
//@access private
router.post(
  "/books/rating/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const book = user.books.filter(
          book => book._id.toString() === req.params.id
        )[0];

        user.books = user.books.filter(
          book => book._id.toString() !== req.params.id
        );

        const newBook = {
          title: book.title,
          author: book.author,
          status: book.status,
          rating: req.body.rating
        };

        user.books.push(newBook);

        user
          .save()
          .then(user => res.json(user.books))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
