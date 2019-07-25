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
      },
      tags: [
        {
          text: {
            type: String,
            required: true
          },
          color: {
            r: {
              type: Number,
              required: true
            },
            g: {
              type: Number,
              required: true
            },
            b: {
              type: Number,
              required: true
            }
          },
          isBright: {
            type: Boolean,
            required: true
          }
        }
      ]
    }
  ],
  tags: [
    {
      text: {
        type: String,
        required: true
      },
      color: {
        r: {
          type: Number,
          required: true
        },
        g: {
          type: Number,
          required: true
        },
        b: {
          type: Number,
          required: true
        }
      },
      isBright: {
        type: Boolean,
        required: true
      }
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
