const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Survey = new Schema({
    publisherId : String,
    isPublished: Boolean,
    question: [
        {
            question: String,
            optionType: String,
            options: Array
        }
    ]
});

module.exports = mongoose.model('Survey', Survey);