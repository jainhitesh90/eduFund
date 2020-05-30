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
    age_group: {
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
    const user = this;
    if (user.isNew) {
        //Perform password hashing here
        bcrypt.hash(user.password, parseInt(process.env.SALTING_ROUND), function (err, hash) {
            if (err) {
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    } else {
        return next();
    }
    
})

module.exports = mongoose.model('User', userSchema);