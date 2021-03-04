const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//const bodyParser= require("body-parser");

const userRouter = require("./router/userRoute");
//const User = require("./model/user");
const homeRouter= require("./router/homeRoute");
const todoRouter = require("./router/todoRoute")


require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(userRouter);
app.use(homeRouter);
app.use(todoRouter)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(process.env.DATABASE_URL, options, (err) => {
  {
    useNewUrlParser: true;
  }
  {
    useUnifiedTopology: true;
  }

  if (err) {
    console.log(err);
    return;
  }
  app.listen(8000, () => {
    console.log("APP IS RuNiNg");
  });
});
