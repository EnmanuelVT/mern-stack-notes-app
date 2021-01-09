const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, require: true },
    color: { type: String, require: true },
    id: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
