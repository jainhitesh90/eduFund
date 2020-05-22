const express = require('express');
const userRoutes = express.Router();

let User = require('../model/user');
let Utility = require('../utility/utilities');

userRoutes.route('/getAllUsers').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/signup').post(function (req, res) {
    var emailQuery = { email: req.body.email };
    User.find(emailQuery, function (err, result) {
        if (err) {
            res.status(450).send({ 'status': 500, error: err });
        } else if (result.length === 0) {
            let token = Utility.generateToken(req.body.email, req.body.password);
            let user = new User(req.body);
            user.token = token;
            user.save()
                .then(user => {
                    res.status(200).json({ 'status': 200, 'user': user });
                })
                .catch(err => {
                    res.status(400).send({ 'status': 400, error: 'Signup failed!' });
                });
        } else {
            res.status(200).send({ 'status': 200, error: 'Already signed up by this email id' });
        }
    });
});

userRoutes.route('/login').post(function (req, res) {
    // first find if email id exists and then validate token
    var emailQuery = { email: req.body.email };
    User.find(emailQuery, function (err, result) {
        if (err) {
            res.status(450).send({ 'status': 500, error: err });
        } else if (result.length === 0) {
            res.status(200).send({ 'status': 200, error: 'User does not exists with this email id'});
        } else {
            let user = new User(result[0]);
            if (user.token === Utility.fetchToken(req.body.email, req.body.password)) {
                res.status(200).send({ 'status': 200, user: user });
            } else {
                res.status(200).send({ 'status': 200, error: 'Incorrect Password' });
            }
        }
    });
});

// userRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     User.findById(id, function(err, user) {
//         res.json(user);
//     });
// });

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


module.exports = userRoutes;