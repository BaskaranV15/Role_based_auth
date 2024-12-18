const express =require('express');
const verifyToken=require('../middleware/authMiddleware');
const router=express.Router();
const authorizeRole=require('../middleware/roleMiddleware')
router.get('/admin',verifyToken,authorizeRole("admin"),(req,res)=>
    {
        res.json({message:'welcome Admin'});
    });

router.get('/Manager',verifyToken,authorizeRole("admin","manager"),(req,res)=>
    {
        res.json({message:'welcome Manager'});
    });

router.get('/user',verifyToken,authorizeRole("admin","manager","user"),(req,res)=>
    {
        res.json({message:'welcome user'});
    });

module.exports=router;