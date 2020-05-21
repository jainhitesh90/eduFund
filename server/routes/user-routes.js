const express = require('express');
const userRoutes = express.Router();

let User = require('../model/user');

userRoutes.route('/getAllUsers').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/signup').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'message': user.name + ' signup successfull'});
        })
        .catch(err => {
            res.status(400).send('Signup failed!');
        });
});

userRoutes.route('/login').post(function(req, res) {
    let id = req.params.email;
    User.findById(id, function(err, user) {
        res.status(200).json({'message': 'Welcome ' + user.name});
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