var express = require('express');
var router = express.Router();
router.post('/data', (req, res)=>{
    console.log(req.body);
    res.status(201);
   
})
router.get('/data', (req, res)=>{
    res.send(req.query.msg)
    console.log(req.query.msg)
    res.status(200)
    .json({'msg': req.query.msg});
})
module.exports=router