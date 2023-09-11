const bookModel = require("../models/book");
const authorModel = require("../models/author");
const {validationResult}=require('express-validator')

const getBooksController = (req, res) => {
  const { param } = req.params;
  if (param) {
    let decodedParam = decodeURI(param);
    bookModel
      .find({ author: decodedParam })
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => console.error(err));
  } else {
    bookModel
      .find()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => console.error(err));
  }
};

const createBookController = (req, res) => {
  //validation
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    console.log(errors)
    return res.json({message:errors.array()[0].msg})
  }
  const { title, author, description } = req.body;
  const book = new bookModel({ title, author, description });
  book.save().then((result) => {
    res.json({ message: "New book instance created", data: result });
  });
};
const updateBookController = (req, res) => {
  const { _id, title, author, description } = req.body;
  bookModel.findById(_id).then((book) => {
    if (book) {
      book.title = title;
      book.author = author;
      book.description = description;

      book.save();
      res.json({ message: "Book has been updated", data: book });
    }
    {
      res.json({ message: "Book was not found" });
    }
  });
};
const deleteBookController = (req, res) => {
  const { title } = req.body;
  bookModel.findOneAndDelete({ title }).then((book) => {
    if (book) {
      authorModel
        .deleteMany({ bookid: book._id })
        .then((result) => res.json({ message: "Book deleted", data: book }));
    } else {
      res.json({ message: "Book not found" });
    }
  });
};

module.exports = {
    getBooksController,
    createBookController,
    updateBookController,
    deleteBookController,
  };
  