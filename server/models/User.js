// User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Simple email validation
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      // pasword is required for local registration -> front-end
      required: false,
      // password validation is performed before hashing
    },
    googleId: {
      type: String,
      // googleID is taken in Google registration
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      // username validation is performed
      // before inserting
    },
    profileImage: {
      type: String,
      required: false,
    },
    birthdate: {
      type: Date,
      required: false,
    },
    roomNumber: {
      type: Number,
      required: false,
      unique: true,
      // room number validation
      // is performed before inserting
    },
  });

module.exports = mongoose.model('User', UserSchema);
