const moongose = require("mongoose");

const Schema = moongose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlenght: 3,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = moongose.model("User", userSchema);

module.exports = User;
