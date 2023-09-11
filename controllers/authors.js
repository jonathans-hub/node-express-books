const authorModel = require("../models/author");
const {validationResult}=require('express-validator')

const createAuthorController = (req, res) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: "failed to add Author" });
  }
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
  createAuthorController,
  getAuthorsController,
  deleteAuthorController,
};
