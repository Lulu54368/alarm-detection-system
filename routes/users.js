var express = require('express');
var router = express.Router();
const bcrypt = require ('bcrypt');
const User = require("../model/user").User
const jwt = require('jsonwebtoken');
const cors = require('cors')
const corsOptionsDelegate = require('../middleware/cors').corsOptionsDelegate
const { verify, findUser } = require('../middleware/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 
router.post('/register', async(req, res, next)=>{
  //res.status(201).json(req.body);
  //add new user and return 201
  const salt = await bcrypt.genSalt(10);
  var usr = {
   
    username : req.body.username,
    password : await bcrypt.hash(req.body.password, salt)
  };
  created_user = await User.create(usr);
  res.status(201).json(created_user);
});


router.post('/login',async(req,res,next)=>{
 const user = await User.findOne({ where : {username : req.body.username }});
 if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){
        token = jwt.sign({ "id" : user.id,"username": user.username},process.env.SECRET);
        res.status(200).json({ token : token });
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  
  });

 
router.get('/me', cors(corsOptionsDelegate),
 verify,
 findUser, (req, res)=>{
  console.log(`user is ${JSON.stringify(req.user)}`)
   res.status(200).json({'user': req.user})
 }
 
)
module.exports = router;
