const express=require("express");
const { v4: uuidv4 } = require('uuid');
const userModel=require("../models/userModel");
const cryptoJs=require("crypto-js");
const jwt=require("jsonwebtoken");
const userRoute=express.Router();


userRoute.get("/signin",(req,res)=>{
    const {email,password}=req.query;
    //on signing in decrypting the data..
     userModel.findOne({email,password:`${cryptoJs.SHA256(password)}`}).then((data)=>{
        if(data){
            var token = jwt.sign({ id: data.uuid }, `${process.env.JWT_KEY}`);
            res.send({name:data.username,email:data.email,token:token,id:data.uuid});
        }
        else{
            res.status(404).send(({code:404,message:"Not found"}))
        }
       
    }).catch((err)=>{
        console.log(err,"ERRR");
    })

})
userRoute.post("/signup",(req,res)=>{
    let uuid=uuidv4();
    const {email,firstName,lastName,address}=req.body;
    //password decryption for data security
    const password=cryptoJs.SHA256(req.body.password);
    userModel.findOne({
        email
    })
    .then((data)=>{
        if(data){
            userModel.findOneAndUpdate({
                email
            },{$set:{password,email,firstName,lastName,address,uuid}})
            res.status(200).send({message:"User data update successfully.."});
        }else{
            const model=new userModel({
                email,password,email,firstName,lastName,address,uuid
            });
            model.save().then((data)=>{
                res.status(201).send({message:"User created successfully..",id:data.uuid});
            })

        }
    } );
    
    
  
   
})
// userRoute.delete("/deleteData",(req,res)=>{
//     res.send("delete one data.....")

// })
module.exports=userRoute;