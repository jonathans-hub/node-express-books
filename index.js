const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const server = express();

const BookSchema = new mongoose.Schema({
  title :  String,
  author: String,
  description: String,
})

const bookModel = mongoose.model("books", BookSchema)


//controllers
const getBookscontroller = (req, res) => {
  const {param} = req.params
  if(param){
    let decodedParam = decodeURI(param)
    bookModel.find({author: decodedParam}).then(result=>{
      res.json({ data: result });
    }).catch(err=>console.error(err));
  }
  else{bookModel.find().then(result=>{
    res.json({ data: result });
  }).catch(err=>console.error(err));}
};

const createBookscontroller = (req, res) => {
  const { title, author, description } = req.body;
  const book = new bookModel({title, author, description});
  book.save().then(result=>{
    res.json({ message: "New book instance created", data: result });

  })
};
// const updateBookscontroller = (req, res) => {
//   const { title, author, description } = req.body;
//   const updatedBook = bookModel.update({ title, author, description });
//   res.json({ message: "Book has been updated", data: updatedBook });
// };
// const deleteBookscontroller = (req, res) => {
//     const {title}=req.body
//     const deletedBook= bookModel.delete({title})
//     res.json({ message: "Book has been deleted", data:deletedBook})
// };

//middlewares
server.use(bodyParser.json());

//routes
server.get("/books/:param?", getBookscontroller);
server.post("/books", createBookscontroller);
// server.put("/books", updateBookscontroller);
// server.delete("/books", deleteBookscontroller);


mongoose.connect("mongodb+srv://jonathan:asbqmDqKn2O9WXJw@cluster0.lir8ktj.mongodb.net/codetrain?retryWrites=true&w=majority").then(
  result =>{  
    server.listen(3001, () => console.log("server is ready"));
  }
).catch(err=>console.error(err))
