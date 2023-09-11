const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authorModel = require("../models/author");
const bookModel = require("../models/book");

const {
  createAuthorController,
  getAuthorsController,
  deleteAuthorController,
} = require("../controllers/authors");

router.post(
  "/authors",
  [
    body("email")
      .isEmail()
      .not()
      .isEmpty()
      .withMessage("cannot be empty")
      .custom((emailValue, { req }) => {
        return authorModel.findOne({ email: emailValue }).then((authorEmail) => {
          if (authorEmail) {
            return Promise.reject("Email already in use");
          }
        });
      }),
    body("name").trim().not().isEmpty().withMessage("cannot be empty"),
    body("country").trim().not().isEmpty().withMessage("cannot be empty"),
    body("bookid")
      .trim()
      .not()
      .isEmpty()
      .withMessage("cannot be empty")
      .custom((_id, { req }) => {
        return bookModel.findById({_id}).then((bookById) => {
          if (!bookById) {
              return Promise.reject("Invalid Id");
            }
          
        });
      }),
  ],
  createAuthorController
);
router.get("/authors/:param?", getAuthorsController);
router.delete("/authors", deleteAuthorController);

module.exports = router;
