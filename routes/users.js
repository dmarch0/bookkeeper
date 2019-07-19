const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
              res.json({ success: true, token: token });
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

module.exports = router;
