const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Subject = require('../models/subjects');
const Student = require('../models/student');
const Attendance = require('../models/attendance');


router.post('/add', async(req,res)=>{
    const sub = {
        subname: req.body.subname,
        subcode: req.body.subcode
    };
    let obj;
    try{
        obj = await Subject.create(sub);
    }
    catch(err){
        console.log(err);
    }
    if(obj){
        res.status(201).json({
            data:obj
        })
    }
})

router.post('/', async(req,res)=>{
    try{
        const subject = await Subject.find();
        res.status(200).json({
            message: 'success',
            data: subject
        })
    }
    catch(err){
        res.status(404).json({
            message:'fail',
            error: err
        })
    }
})

router.delete('/:id', async(req,res)=>{
    const subcode = req.params.id;
    // console.log(subcode);
    try{
        const delsub = await Subject.findOneAndDelete({subcode:subcode});
        // console.log(delsub);
        if(!delsub){
            res.status(404).json({
                status:'fail',
                message:'Subject not found'
            })
        }
        res.status(201).json({
            status:'success',
            message:'Subject deleted'
        })
    }
    catch(err){
        res.status(500).json({ 
            message: err.message
        });
    }
})


module.exports = router;
