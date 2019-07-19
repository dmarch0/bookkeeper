//package imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

//routes imports
const users = require("./routes/users");

//db connection string
const db = require("./config/keys").mongoDB;

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

//connecting db
mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
