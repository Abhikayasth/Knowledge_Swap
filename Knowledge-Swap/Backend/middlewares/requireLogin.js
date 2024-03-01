const jwt = require("jsonwebtoken")
const {Jwt_secret} = require("../keys.js")
const mongoose = require("mongoose")
const USER = mongoose.model("USER")

module.exports = (request,response,next) =>{
    const {authorization} = request.headers;
    if(!authorization){
        return response.status(401).json({error:"You must have logged in  1..."})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,(err, payload)=>{
        if(err){
            return response.status(401).json({error:"You must have logged in  2..."})
        }
        const {_id} = payload
        USER.findById(_id).then(userData=>{
            request.user = userData
            next()
        })
    })
    
}