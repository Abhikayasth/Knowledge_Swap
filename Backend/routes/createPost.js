const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");

//Route
router.post("/createPost",requireLogin,(request,response)=>{
    const {body,pic}=request.body;
    console.log(pic)
    if(!body || !pic){
        return response.status(422).json({error:"Please add all the fields..."})
    }
    console.log(request.user)
    const post = new POST({
        body,
        photo:pic,
        postedBy:request.user
    })
    post.save().then((result)=>{
        return response.json({post:result})
    }).catch(err=>console.log(err))
})
module.exports = router;
