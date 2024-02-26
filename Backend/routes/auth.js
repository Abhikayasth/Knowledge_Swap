const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Jwt_secret} = require("../keys.js");
const requireLogin = require("../middlewares/requireLogin.js");

router.get("/", (request, response) => {
  response.send("hello");
});

{/*router.get("/createPost",requireLogin, (request,response)=>{
  console.log("Hello auth..")
})*/}

router.post("/signup", async (request, response) => {
  const { name, userName, email, password } = request.body;
  if (!name || !email || !userName || !password) {
    return response.status(422).json({ error: "Please add all the fields..." });
  }
  try {
    const savedUser = await USER.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (savedUser) {
      return response
        .status(422)
        .json({ error: "User already exists with that email or username..." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new USER({
      name,
      email,
      userName,
      password: hashedPassword,
    });
    await user.save();
    response.json({ message: "Registered Successfully..." });
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: "Something went wrong..." });
  }
});
router.post("/signin", (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response
      .status(422)
      .json({ error: "Please add email and password..." });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return response.status(422).json({ error: "Invalid email..." });
    }
    bcrypt.compare(password,savedUser.password).then((match)=>{
      if(match){
        //return response.status(200).json({message:"Signed in Successfully..."})
        const token = jwt.sign({_id:savedUser.id},Jwt_secret)
        response.json(token)
        console.log(token)
      }else{
        return response.status(422).json({error:"Invalid password..."})
      }
    }).catch(err=>console.log(err))
  });
});
module.exports = router;
