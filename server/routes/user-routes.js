const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');

let User = require('../model/user');
// let SurveyResponse = require('../model/survey-response');
let Utility = require('../utilities/utility');

userRoutes.route('/signup').post(function (req, res) {
    const params = req.body;
    User.find({ email: params.email }, function (err, result) {
        if (!err) {
            if (result.length === 0) {
                let user = new User(params)
                let token = Utility.createToken(user.email);
                user.token = token;
                if (params.role !== 'respondant') {
                    user.gender = null;
                    user.ageGroup = null;
                }
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
    console.log('email', email);
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
                    payload.token = user.token;
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

userRoutes.route('/takeSurvey').post(function (req, res) {
    let body = req.body;
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        User.find({ email: jwtTokenObject.email }, function (err, users) {
            const user = users[0]
            if (err) {
                res.status(500).send({ error: err });
            } else {
                const surveyId = body.surveyId;
                if (user.surveysTaken.indexOf(surveyId) === -1) {
                    user.surveysTaken.push(surveyId);
                    user.save()
                        .then(user => {
                            res.status(200).json({ 'message': 'survey taken successfully', data: user });
                        })
                        .catch(err => {
                            res.status(500).send({ error: err });
                        });
                } else {
                    res.status(200).send({ error: 'Survey already taken' });
                }
            };
        });
    }
});

userRoutes.route('/submitSurvey').post(function (req, res) {
    let body = req.body;
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        User.find({ email: jwtTokenObject.email }, function (err, users) {
            const user = users[0]
            if (err) {
                res.status(500).send({ error: err });
            } else {
                // const surveyId = body.surveyId;
                console.log('recvd body', body);
                // let surveyResponse = new SurveyResponse(body);
                // const surveysTaken = user.surveysTaken || [];
                const surveysTaken = user.surveysTaken || [];
                let surveyAlreadyTaken = false;
                for (let m = 0; m < surveysTaken.length; m++) {
                    if (surveysTaken[m].surveyId === body.surveyId) {
                        surveyAlreadyTaken = true;
                        break;
                    }
                }
                console.log('surveyAlreadyTaken', surveyAlreadyTaken);
                if (surveyAlreadyTaken) {
                    res.status(200).send({ error: 'Survey already taken' });
                } else {
                    user.surveysTaken.push(body);
                    user.save()
                        .then(user => {
                            res.status(200).json({ 'message': 'survey taken successfully', data: user });
                        })
                        .catch(err => {
                            res.status(500).send({ error: err });
                        });
                }
                // res.status(500).send({ error: 'api yet to implement' });
                // if (user.surveysTaken.indexOf(surveyId) === -1) {
                    // user.surveysTaken.push(surveyResponse);
                    // user.save()
                    //     .then(user => {
                    //         res.status(200).json({ 'message': 'survey taken successfully', data: user });
                    //     })
                    //     .catch(err => {
                    //         res.status(500).send({ error: err });
                    //     });
                // } else {
                //     res.status(200).send({ error: 'Survey already taken' });
                // }
            };
        });
    }
});

module.exports = userRoutes;