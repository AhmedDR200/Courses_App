const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 10000
    }
})

 
module.exports = mongoose.model('Course', courseSchema);