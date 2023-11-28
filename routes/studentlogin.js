const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const student = require('../models/student')
const bcrypt = require('bcryptjs')

// router.post('/login', async(req,res)=>{
//     const halltktno = req.body.halltktno;
//     const password = req.body.password;
//     try{
//         const exists = await student.find({halltktno: halltktno})
//         if(!exists){
//             //throw
//             return res.status(404).json({
//                 status: 'fail',
//                 message: "User not found"
//             })
//         }
//         // Compare passwords
//         const epassword = bcrypt.hash(password,12);
//         if(exists.password === epassword){

//         }
//     }
// })

// router.post('/changePassword', async(req,res)=>{
//     try{
//         // const currpwd = await student.find({halltktno : req.body })

//     }
// })