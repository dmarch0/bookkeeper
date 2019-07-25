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
          rating: book.rating,
          tags: book.tags
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

        const insertionIndex = user.books.indexOf(book);

        user.books = user.books.filter(
          book => book._id.toString() !== req.params.id
        );

        const newBook = {
          title: book.title,
          author: book.author,
          status: book.status,
          rating: req.body.rating,
          tags: books.tags
        };

        //user.books.push(newBook);
        user.books.splice(insertionIndex, 0, newBook);

        user
          .save()
          .then(user => res.json(user.books))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//@route POST /api/users/books/tag/:id
//@desc add a tag to a book
//@access private
router.post(
  "/books/tag/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        //find if tag already exists
        const existingTag = user.tags.filter(
          tag => tag.text === req.body.text
        )[0];

        const book = user.books.filter(
          book => book._id.toString() === req.params.id
        )[0];

        if (!book) {
          return res.status(404).json({ notfount: "Book not found" });
        }

        if (existingTag) {
          //Add this tag to the book tag

          const newTags = [...book.tags];
          newTags.push(existingTag);

          const insertionIndex = user.books.indexOf(book);

          user.books = user.books.filter(
            book => book._id.toString() !== req.params.id
          );

          const newBook = {
            title: book.title,
            author: book.author,
            status: book.status,
            rating: book.rating,
            tags: newTags
          };

          //user.books.push(newBook);
          user.books.splice(insertionIndex, 0, newBook);

          user
            .save()
            .then(user => res.json(user.books))
            .catch(err => console.log(err));
        } else {
          //Create a tag and add it to the book
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          const color = { r, g, b };
          const brightnessValues = (r * 299 + g * 587 + b * 114) / 1000;
          const isBright = brightnessValues < 125 ? false : true;

          const newTag = { color, isBright, text: req.body.text };

          user.tags.push(newTag);

          const newTags = [...book.tags];
          newTags.push(newTag);

          const insertionIndex = user.books.indexOf(book);

          user.books = user.books.filter(
            book => book._id.toString() !== req.params.id
          );

          const newBook = {
            title: book.title,
            author: book.author,
            status: book.status,
            rating: book.rating,
            tags: newTags
          };

          //user.books.push(newBook);
          user.books.splice(insertionIndex, 0, newBook);

          user
            .save()
            .then(user => res.json(user.books))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

//@route DELETE /api/users/books/tag/:book_id/:tag_id
//@desc remove tag from a book
//@access private
router.delete(
  "/books/tag/:book_id/:tag_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        //Check if book exists
        const book = user.books.filter(
          book => book._id.toString() === req.params.book_id
        )[0];

        if (!book) {
          return res.status(404).json({ notfount: "Book not found" });
        }

        //Check if tag exists
        const existingTag = book.tags.filter(
          tag => tag._id.toString() === req.params.tag_id
        )[0];

        if (!existingTag) {
          return res.status(404).json({ notfount: "Tag not found" });
        }

        //Remove tag from the book
        //If no book left with such tag, remove it from the user.tags array
        const newTags = book.tags.filter(
          tag => tag._id.toString() !== req.params.tag_id
        );

        const insertionIndex = user.books.indexOf(book);

        user.books = user.books.filter(
          book => book._id.toString() !== req.params.book_id
        );

        const newBook = {
          title: book.title,
          author: book.author,
          status: book.status,
          rating: book.rating,
          tags: newTags
        };

        //user.books.push(newBook);
        user.books.splice(insertionIndex, 0, newBook);

        if (
          user.books.filter(
            book =>
              book.tags.filter(tag => tag.text === existingTag.text).length > 0
          ).length > 0
        ) {
          user
            .save()
            .then(user => res.json(user.books))
            .catch(err => console.log(err));
        } else {
          user.tags = user.tags.filter(tag => tag.text !== existingTag.text);

          user
            .save()
            .then(user => res.json(user.books))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
