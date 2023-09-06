const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
  createAuthorController,
  getAuthorsController,
  deleteAuthorController,
} = require("./controllers");

const server = express();

//middlewares
server.use(bodyParser.json());

//routes
server.get("/books/:param?", getBooksController);
server.post("/books", createBookController);
server.put("/books", updateBookController);
server.delete("/books", deleteBookController);
server.post("/authors", createAuthorController);
server.get("/authors/:param?", getAuthorsController);
server.delete("/authors", deleteAuthorController);

mongoose
  .connect(
    "mongodb+srv://jonathan:asbqmDqKn2O9WXJw@cluster0.lir8ktj.mongodb.net/codetrain?retryWrites=true&w=majority"
  )
  .then((result) => {
    server.listen(3001, () => console.log("server is ready"));
  })
  .catch((err) => console.error(err));
