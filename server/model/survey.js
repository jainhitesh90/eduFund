const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Survey = new Schema({
    publisherId : String,
    isPublished: Boolean,
    title: String,
    questions : [
        {
            question: String,
            options: Array
        }
    ],
    targetGroup: {
        ageGroup: String,
        gender: String
    }
});

module.exports = mongoose.model('Survey', Survey);