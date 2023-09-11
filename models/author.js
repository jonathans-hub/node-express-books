const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bookid:  {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  }
});

const authorModel = mongoose.model("Authors", AuthorSchema);

module.exports = authorModel;