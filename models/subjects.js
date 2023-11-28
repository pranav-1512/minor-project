const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    subname :{
        type: String,
        required: true
    },
    subcode :{
        type: String,
        required:true,
        unique:true
    }
})
module.exports = mongoose.model('Subject', subjectSchema)