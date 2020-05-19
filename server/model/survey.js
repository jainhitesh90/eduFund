const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Survey = new Schema({
    survey_name: {
        type: String
    }
});

module.exports = mongoose.model('Survey', Survey);