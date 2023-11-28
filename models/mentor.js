const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    empid:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Mentor',mentorSchema)