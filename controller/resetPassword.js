//const { request } = require("express");
const User = require("../model/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt=require("bcrypt")


const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "feddynamiskweb@gmail.com",
    pass: "FedDynamiskWeb.2021",
  },
});

const resetRender = (req, res) => {

  res.render("reset.ejs", {err:""}); 

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

  transport.sendMail({
    from: "feddynamiskweb@gmail.com",
    to: user.email,
    subject: "Need a brand new password?",
    html: `<h2> Click here <a href="http://localhost:8000/reset/${user.token}> for your new password </h2>`,
  })

  res.render("checkMail.ejs")

}

const resetParams= async(req,res)=>{

  const token = req.params.token;


  try{
  const user=await User.findOne({token:token, tokenExpiration: { $gt: Date.now() } });

  if(!user) return res.redirect("register");

  res.render("resetPasswordForm.ejs", {err:"", email: user.email})
  
  }

  catch (err){

   res.render("reset.ejs", {err: "try again" })

  }

}


const resetFormSubmit = async(req,res)=>{

    const password= req.body.password
    const email= req.body.email;

    const salt=await bcrypt.genSalt(12); 
    const hashedPassword= await bcrypt.hash(password, salt);

    const user= await User.findOne({email:email});

    user.password = hashedPassword;
    await user.save();
    res.redirect ("/login")


}




module.exports = {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
};
