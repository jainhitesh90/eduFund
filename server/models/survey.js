const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let surveySchema = new Schema({
    publisherId: {
        type: String
    },
    isPublished: {
        type: Boolean, 
        default: false
    },
    title: {
        type: String
    },
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

module.exports = mongoose.model('Survey', surveySchema);