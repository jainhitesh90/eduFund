const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let surveyResponseSchema = new Schema({
    surveyId: String,
    response: Object
});

module.exports = mongoose.model('SurveyResponse', surveyResponseSchema);