const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Survey = new Schema({
    publisherId : String,
    isPublished: Boolean,
    name: String,
    question: [
        {
            question: String,
            options: Array
        }
    ]
});

module.exports = mongoose.model('Survey', Survey);