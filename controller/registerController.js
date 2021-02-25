
const User= require("../model/user");
const bcrypt= require("bcrypt")


const registerRender =(req, res)=>{


    res.render("register.ejs", {err:"  "})

}

const registerSubmit= async (req,res)=>{

    const {name, email, password}=req.body;



    try{
    const salt= await bcrypt.genSalt(12);
    const hashedPassword= await bcrypt.hash(password, salt)

   await new User({
        name: name,
        email: email,
        password:hashedPassword
    }).save();
    return res.redirect("/login")
    }

    catch(err){
        if(err) return res.render("register.ejs", {err:err}) 
    }
    }

module.exports ={
    registerRender,
    registerSubmit

} 