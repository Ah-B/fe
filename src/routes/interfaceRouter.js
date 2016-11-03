const express = require('express');
let interfaceRouter = express.Router();

interfaceRouter.get('/',(req,res)=>{
  res.send('Helloworld Homepage')
});
interfaceRouter.get('/login',(req,res)=>{
  res.send('login page')
});
interfaceRouter.get('/register',(req,res)=>{
  res.send('register page')
});

module.exports = interfaceRouter;
