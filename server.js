require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Port = process.env.PORT || 5200;
const adminRouter = require('./Router/adminRouter');

server.use(express.urlencoded({extended:true}));

server.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.setHeader('Cache-Control','no-store,no-cache,must-revalidate,proxy-revalidate');
    next();
});

server.use(cors());

server.use(adminRouter);

server.use((req,res)=>{
    res.send("<H1>Page Not Found,Please Check again </H1>")
})

mongoose.connect(process.env.DB_URL)
.then(res=>{
    console.log("The Database is connected Successfully");
    server.listen(Port,()=>{
        console.log(`The Server is running at http://localhost:${Port}`);
    });
})
.catch(error=>{
    console.log("Failed To connect with the Database:",error);
})

