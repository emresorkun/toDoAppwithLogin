const express= require("express");

const router= express.Router();

const {registerRender,registerSubmit}=require("../controller/registerController")

const {loginRender,loginSubmit}=require("../controller/loginController");
//const { verify } = require("jsonwebtoken");

const {resetRender, resetSubmit}=require("../controller/resetPassword");


const verifyToken= require("../middleware/verifyUser");


router.get("/register", registerRender);

router.post("/register", registerSubmit);

router.get("/login", loginRender); 

router.post("/login", loginSubmit);


router.get("/reset", resetRender); 

router.post("/reset", resetSubmit);



module.exports= router;