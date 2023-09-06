const bookModel = require("./bookModel");
const authorModel = require("./authorModel");

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
const createAuthorController = (req, res) => {
  const { name, email, country, bookid } = req.body;
  const author = new authorModel({ name, email, country, bookid });
  author.save().then((result) => {
    if (result) {
      res.json({ message: "Author instance created", data: result });
    } else {
      res.json({ message: "Author instance not created" });
    }
  });
};
const getAuthorsController = (req, res) => {
  const { param } = req.params;
  if (param) {
    authorModel
      .find({ _id: param })
      .populate("bookid", "title author description")
      .then((result) => res.json({ data: result }))
      .catch((err) => console.error(err));
  } else {
    authorModel
      .find()
      .populate("bookid", "title author description")
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => console.error(err));
  }
};
const deleteAuthorController = (req, res) => {
  const { name } = req.body;
  authorModel
    .findOneAndDelete({ name })
    .then((author) => {
      if (author) {
        res.json({ message: "Author deleted", data: author });
      }
      {
        res.json({ message: "Author not found" });
      }
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
  createAuthorController,
  getAuthorsController,
  deleteAuthorController,
};
