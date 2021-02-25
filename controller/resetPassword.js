const { request } = require("express");
const User = require("../model/user");
const crypto = require("crypto");

const resetRender = (req, res) => {
  res.render("reset.ejs");
};

const resetSubmit = async (req, res) => {
  const email = req.body.email;
  //user exist?

  const user = await User.findOne({ email: email });

  if (!user) return res.redirect("/register");

  //token expired?

  const token = await crypto.randomBytes(32).toString("hex");

  // save the token and expire date
  user.token = token;
  user.tokenExpriration = Date.now() + 600000;
  await user.save();
  // send a link with tokken to email
};

module.exports = {
  resetRender,
  resetSubmit,
};
