const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bankRoutes = require('./routes/book')
const authorRoutes = require('./routes/author')

const server = express();

//middlewares
server.use(bodyParser.json());


//routes
server.use(bankRoutes)
server.use(authorRoutes)


mongoose
  .connect(
    "mongodb+srv://jonathan:asbqmDqKn2O9WXJw@cluster0.lir8ktj.mongodb.net/codetrain?retryWrites=true&w=majority"
  )
  .then((result) => {
    server.listen(3001, () => console.log("server is ready"));
  })
  .catch((err) => console.error(err));
