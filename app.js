const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require('express');
const dotenv =require("dotenv").config()
const app = express();
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRouter')
//add db config
const dbConnect=require('./config/dbconnection');
dbConnect();
// build in middleware
app.use(express.json());

// Routes
app.use('/api/auth',authRoutes);

app.use('/api/user',userRoutes);
// Server start 
const PORT =  7001;
// app.use('/',(req,res)=>
// {
//     res.send('welcome to quiz app');
// })

app.listen(PORT,()=>
{
    console.log(`server lister on port ${PORT}`);
    
})