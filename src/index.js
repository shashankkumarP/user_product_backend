const { json } = require("express");
const express = require("express");
const app = express();

const productcontroller = require("./controller/products.controller")
const usercontroller = require("./controller/user.controller")
const timermidleware = (req,res,next)=>{
    console.time("checking");
    next();
    res.on("finish",()=>{
        console.timeEnd("checking")
    })
} 
app.use(express.json())

app.use("/products",timermidleware);
app.use("/products",productcontroller);
app.use("/users",usercontroller)

//REST api
app.listen(8000,()=>{
    console.log("server started")
})











