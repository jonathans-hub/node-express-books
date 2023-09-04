const express = require("express");
const bodyParser = require("body-parser");

const server = express();

//database
let booksDB = [];

class bookModule {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  save() {
    booksDB.push(this);
  }
  static all() {
    return booksDB;
  }
  static update(updateInfo = {}) {
    booksDB = booksDB.map((book) => {
      if (book.title === updateInfo.title) {
        return (this.updatedBook = { ...book, ...updateInfo });
      }
      return book;
    });
    return this.updatedBook;
  }
  static delete({ title }) {
    let deletedBook= null
    booksDB = booksDB.filter((book) => {
      if (book.title === title) {
        deletedBook = book
        return false;
      }
      return true;
    });
    return deletedBook;
  }
}

//controllers
const getBookscontroller = (req, res) => {
  const books = bookModule.all();
  res.json({ data: books });
};
const createBookscontroller = (req, res) => {
  const { title, author, description } = req.body;
  const book = new bookModule(title, author, description);
  book.save();
  res.json({ message: "New book instance created", data: book });
};
const updateBookscontroller = (req, res) => {
  const { title, author, description } = req.body;
  const updatedBook = bookModule.update({ title, author, description });
  res.json({ message: "Book has been updated", data: updatedBook });
};
const deleteBookscontroller = (req, res) => {
    const {title}=req.body
    const deletedBook= bookModule.delete({title})
    res.json({ message: "Book has been deleted", data:deletedBook})
};

//middlewares
server.use(bodyParser.json());

//routes
server.get("/books", getBookscontroller);
server.post("/books", createBookscontroller);
server.put("/books", updateBookscontroller);
server.delete("/books", deleteBookscontroller);

server.listen(3001, () => console.log("server is ready"));
