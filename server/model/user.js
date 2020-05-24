const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

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
    },
    surveysTaken: {
        type: Array
    }
});

// encrypt password before save
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, parseInt(process.env.SALTING_ROUND), function (err, hash) {
        if (err) {
            next(err);
        } else {
            user.password = hash;
            next();
        }
    });
})

module.exports = mongoose.model('User', userSchema);