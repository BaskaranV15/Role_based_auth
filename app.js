const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require('express');
const dotenv =require("dotenv").config()
const app = express();
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRouter')
const questionRoutes = require('./routes/questionRoutes'); // Import question routes
//add db connection
const dbConnect=require('./config/dbconnection');
dbConnect();
// build in middleware for handling request
app.use(express.json());

// Routes
app.use('/api/auth',authRoutes);

app.use('/api/user',userRoutes);

app.use('/api/questions', questionRoutes);


// Server start 
const PORT =  7001;


// console.log('Registering /api/questions route');


app.listen(PORT,()=>
{
    console.log(`server lister on port ${PORT}`);
    
})