const express= require("express");
const dotenv = require("dotenv");  //or can also do require("dotenv").config()
const mongoose = require("mongoose");
const cors = require("cors");
const postRouter = require('./routes/post');



dotenv.config();
const app= express();
const PORT= process.env.PORT||4000;
const uri=process.env.ATLAS_URI;


//middlewear
app.use(cors());
app.use(express.json());
app.use('/posts',postRouter);




mongoose.connect(uri);
const connection= mongoose.connection;
connection.once('open',()=>{
    console.log("Connection established!");
})



app.listen(PORT,(req,res)=>console.log("server up and running in "+PORT));