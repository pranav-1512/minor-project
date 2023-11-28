const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    halltktno:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        default: "1234"
    },
    category:{
        type: String,
        required: true
    },
    contactno:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    mname:{
        type: String,
        required: true
    },
    pcontact:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    tenyr:{
        type: Number,
        required: true
    },
    tenmarks:{
        type: Number,
        required: true
    },
    tweyr:{
        type: Number,
        required: true
    },
    twemarks:{
        type: Number,
        required: true
    },
    tensch:{
        type: String,
        required: true
    },
    twesch:{
        type: String,
        required: true
    },
    hobbies:String,
    careerPlans: String,
    strengths: String,
    weakness: String,
})

module.exports = mongoose.model('Student', studentSchema)