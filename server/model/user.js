const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    ageGroup: {
        type: String
    },
    role: {
        type: String
    },
    token: {
        type: String
    }
    
});

module.exports = mongoose.model('User', User);