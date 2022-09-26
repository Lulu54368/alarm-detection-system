var express = require('express');
var router = express.Router();
router.post('/data', (req, res)=>{
    console.log(req.body);
    res.status(201);
   
})
router.get('/data', (req, res)=>{
    res.send("success")
    res.status(200);
})
module.exports=router