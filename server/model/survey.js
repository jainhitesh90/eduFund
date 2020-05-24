const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let surveySchema = new Schema({
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
    },
    surveyTaken: Boolean
});

module.exports = mongoose.model('Survey', surveySchema);