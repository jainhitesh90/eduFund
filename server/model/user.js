const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
// const environment = process.env.NODE_ENV;
// const bcryptSaltingRound = process.env.BCRYPT_SALTING_ROUND;
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

let userSchema = new Schema({
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
    },
    password: {
        type: String
    }
});

// encrypt password before save
userSchema.pre('save', function (next) {
    console.log('environment', environment);
    const user = this;
    bcrypt.hash(user.password, stage.saltingRounds, function (err, hash) {
        if (err) {
            next(err);
        } else {
            user.password = hash;
            next();
        }
    });
})

module.exports = mongoose.model('User', userSchema);