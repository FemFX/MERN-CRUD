const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    author: { type: String },
    date: Date
  },
  {
    timestamps: true
  }
);

module.exports = model('Note', noteSchema);
