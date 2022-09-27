const express= require("express");

const route = express.Router();

const fs = require("fs");


route.get("/",(req,res)=>{
    res.send('<h1>This user get api</h1>')
})

module.exports=route;