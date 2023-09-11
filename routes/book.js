const express = require("express");
const router = express.Router();
const {body}= require('express-validator')
const {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
} = require("../controllers/books");

router.get("/books/:param?", getBooksController);
router.post("/books", [
    body('title').trim().not().isEmpty().withMessage('cannot be empty'),
    body('author').trim().not().isEmpty().withMessage('cannot be empty'),
    body('description').trim().not().isEmpty().withMessage('cannot be empty'),
], createBookController);
router.put("/books", updateBookController);
router.delete("/books", deleteBookController);

module.exports = router;
