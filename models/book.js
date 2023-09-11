const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authordeets: [
    {
      bookid: {
        type: Schema.Types.ObjectId,
        ref: "Authors",
        required: true,
      },
    },
  ],
});

const bookModel = mongoose.model("Books", BookSchema);

module.exports = bookModel;
