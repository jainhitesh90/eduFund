const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let surveySchema = new Schema({
    publisher_id: {
        type: String
    },
    is_published: {
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
    target_group: {
        age_group: String,
        gender: String
    },
    user_responses: [
    ]
});

module.exports = mongoose.model('Survey', surveySchema);