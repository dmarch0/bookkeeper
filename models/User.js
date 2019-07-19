const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  books: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      rating: {
        type: Number
      }
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
