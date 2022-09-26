const e = require('express');
const User = require('../model/user').User;

jwt = require('jsonwebtoken')

const verify=async(req,res,next)=>{
    try {
      let token = req.headers['authorization'].split(" ")[1];
      let decoded = jwt.verify(token,process.env.SECRET);
      req.user = decoded;
      next();
    } catch(err){
      res.status(401).json({"msg":"Couldnt Authenticate"});
    }
}
const findUser =   async(req,res,next)=>{
    let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
    if(user === null){
      res.status(404).json({'msg':"User not found"});
    }
    else{
        req.user = user.toJSON()
        next()
    }
    
    
 }
module.exports = {verify, findUser}
