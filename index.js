const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const userSchema = require("./schema")

const app = express();









app.post('/rohitha',async(req,res)=>{
    try{
       const {name,email,password} = req.body;
       if(!email || !name || !password){
        return  res.status(400).respond({msg:"All fields are required"});
      }
      const existingUser = await userSchema.findOne({email});
      if(existingUser){
          return res.status(500).send({msg:"user already exists"});
      }

      const data = new userSchema({name,email,password});
      await data.save();
      return res.status(200).send({msg:"User created successfullyy.."});

    }
    catch(error){
        res.status(400).send({msg:"Something went wrong"})

    }
})

app.get('/ping',(req,res)=>{
    res.status(200).send({msg:"Ping-Pong"})
})


app.listen(8000,async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("Server connected successefully")

    }
    catch(error){
        console.log("Error");
          

    }
})