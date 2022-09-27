const express= require("express");

const route = express.Router();

const fs = require("fs");

const productsS = fs.readFileSync(`${__dirname}/../products.json`,{encoding:'utf-8'})
let products = JSON.parse(productsS);


// let data = [1,3,4,5];

// let products = [
    // {id:1,name:"p1",price:300},
    // {id:2,name:"p2",price:3000},
    // {id:3,name:"p3",price:500},
    // {id:4,name:"p4",price:7000},
    // {id:5,name:"p5",price:6000},
    // {id:6,name:"p5",price:6000}

    
// ]
//middleware

route.get("/",(req,res)=>{
    // res.write(JSON.stringify(data))
    //res.end()
    console.log(typeof(products))
    res.send(products)
});
//query
// route.get("/",(req,res)=>{
//     const {price} = req.query;
//     let result = products.filter((p)=>{
//         if(price){
//             return p.price===parseInt(price);

//         }
//         return true;
//     });
//     res.send(result);
// })
//simpler post request to see it is working or not in console
// route.post("/",(req,res)=>{
//     let body = req.body;
//     console.log(body)
// })

//post request for add to products
// route.post("/",(req,res)=>{
//     let body = req.body;
//     let newProduct={
//         id:products.length+1,
//         ...body
//     };
//     products.push(newProduct);
//     res.send(newProduct)
// })


route.post("/",(req,res)=>{
   
    let newProduct = {
        id:products.length+1, 
        ...req.body,
    };
    products.push(newProduct);
    fs.writeFileSync(`${__dirname}/../products.json`,JSON.stringify(products),{encoding:'utf-8'})
    res.send(newProduct);
})

//Delete api

route.delete("/:id",(req,res)=>{
    let {id} = req.params;
    let updateddata = products.filter((p)=>p.id!=parseInt(id))
    if(products.length==updateddata.length){
        res.sendStatus(404).send("id not found")
    }
    fs.writeFileSync(`${__dirname}/../products.json`,JSON.stringify(updateddata),{encoding:'utf-8'});
    res.sendStatus(202).send(1);
    
})



//path 
route.get("/:id",(req,res)=>{
    let {id} = req.params;
    let numid = Number(id);
    let prod = products.find((p)=>p.id===numid);
    res.send(prod)
})

module.exports = route;