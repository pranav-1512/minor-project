const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
    rollno: Number,
    category: String,
    certificateUrl: String
})
module.exports = mongoose.model('Certificate', certificateSchema)