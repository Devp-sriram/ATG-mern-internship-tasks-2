const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requireed: true,
    },
    email: {
      type: String,
      requireed: true,
      unique: true,
    },
    password: {
      type: String,
      requireed: true,
    },
    jionedOn: {
      type: Date,
      default: Date.now(),
    },
    token: {
      type: String,
    },
    otp: {
      type:Number,
    },
  },{
    collection: "User",
  });

module.exports = mongoose.model("User", userSchema );
exports.userSchema =userSchema;

