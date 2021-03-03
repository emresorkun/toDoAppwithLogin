//const { request } = require("express");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
          
  if (!token) return res.render("login.ejs", { err: "You have to log in" });

  const validUser = jwt.verify(token, process.env.SECRET_KEY);


  console.log("valid user", validUser)
  if (validUser) {
    req.user = validUser;
  }

  next();
};

module.exports = verifyToken;
