const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');

let User = require('../model/user');
let Utility = require('../utilities/utility');

userRoutes.route('/signup').post(function (req, res) {
    User.find({ email: req.body.email }, function (err, result) {
        if (!err) {
            if (result.length === 0) {
                let user = new User(req.body)
                let token = Utility.getToken(user.email);
                user.save((err, user) => {
                    if (!err) {
                        res.status(201).send({ user: { token: token } });
                    } else {
                        res.status(500).send({ error: err });
                    }
                });
            } else {
                res.status(200).send({ error: 'Already signed up by this email id' });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });
});

userRoutes.route('/login').post(function (req, res) {
    const { email, password } = req.body;
    var emailQuery = { email: email };
    User.find(emailQuery, function (err, result) {
        if (err) {
            res.status(500).send({ error: err });
        } else if (result.length === 0) {
            res.status(200).send({ error: 'User does not exists with this email id' });
        } else {
            let user = new User(result[0]);
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    var payload = user.toObject();
                    delete payload.password;
                    payload.token = Utility.getToken(user.email);
                    res.status(200).send({ user: payload });
                } else {
                    res.status(200).send({ error: 'Incorrect password' });
                }
            }).catch(err => {
                res.status(500).send({ error: err });
            });
        }
    });
});

userRoutes.route('/getAllUsers').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send({ users: users });
        }
    });
});

userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send({ user: user });
        }
    });
});

// userRoutes.route('/update/:id').post(function(req, res) {
//     User.findById(req.params.id, function(err, user) {
//         if (!user)
//             res.status(404).send("data is not found");
//         else
//             user.user_name = req.body.user_name;
//             user.user_email = req.body.user_email;
//             user.user_age = req.body.user_age;
//             user.save().then(user => {
//                 res.json('User updated!');
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });

// userRoutes.route('/deleteAllUsers').post(function (req, res) {
//     User.deleteMany({}, res.json({data: 'removed all user'}))
// });

module.exports = userRoutes;