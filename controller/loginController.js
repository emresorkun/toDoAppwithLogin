const User = require("../model/user");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

require("dotenv").config();
const loginRender=(req, res)=>{
    res.render("login.ejs", {err:"  "})

}

const loginSubmit = async(req, res)=>{

//read from req.body
const {email, password}=req.body;
//check if user is in the db
const user=await User.findOne({email:email});

//console.log(password);

if(!user) return res.redirect("/register")
//compare the passwords 
const validUser=await bcrypt.compare(password, user.password)

console.log(validUser)

if(!validUser) return res.redirect("/login"); 

const jwtToken= await jwt.sign( {user:user}, process.env.SECRET_KEY)

if(jwtToken) { 

    const cookie= req.cookies.jwtToken

if(!cookie) {
    
    res.cookie("jwtToken", jwtToken, {maxAge:999999999999, httpOnly:true})
}
    //hersey yolunda ise buraya? ya da kendi todo listesine?
    return res.redirect("/")

}

return res.redirect("/login")
// return res.redirect("/login") BURADA UYENIN TODO LISTESINE MI GONDEREBILIR!!   
// res.send("succesfully logged in")

    //  
//let the user in
    //
}

module.exports = {
    loginRender, 
    loginSubmit
}