const express = require('express');
const surveyRoutes = express.Router();

let Survey = require('../model/survey');
let User = require('../model/user');
let Utility = require('../utilities/utility');

surveyRoutes.route('/add').post(function (req, res) {
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        let survey = new Survey(req.body);
        User.find({ email: jwtTokenObject.email }, function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            } else if (result.length === 0) {
                res.status(500).send({ error: 'User not found' });
            } else {
                survey.publisherId = result[0]._id;
                survey.isPublished = false;
                survey.save()
                    .then(survey => {
                        res.status(200).json({ data: survey, message: 'Survey added successfully' });
                    })
                    .catch(err => {
                        res.status(500).send({ error: err });
                    });
            }
        });
    }
});

surveyRoutes.route('/getAllSurveys').get(function (req, res) {
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        Survey.find(function (err, surveys) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                res.status(200).send({ surveys: surveys });
            }
        });
    }
});

surveyRoutes.route('/getCoOrindtorSurveys').get(function (req, res) {
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        console.log('email foundddd', jwtTokenObject.email);
        User.find({ email: jwtTokenObject.email }, function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            } else if (result.length === 0) {
                res.status(200).send({ error: 'User does not exists with this email id' });
            } else {
                let user = new User(result[0]);
                Survey.find({ publisherId: user._id }, function (err, surveys) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.status(200).send({ surveys: surveys });
                    }
                });
            }
        });
    }
});

surveyRoutes.route('/getRespondantSurveys').get(function (req, res) {
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        User.find({ email: jwtTokenObject.email }, function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            } else if (result.length === 0) {
                res.status(500).send({ error: 'User not found' });
            } else {
                const user = result[0];
                // const query1 = { targetGroup: null }
                // const query2 = { targetGroup: { gender: (user.gender || 'both') } }
                // const query3 = { targetGroup: { ageGroup: (user.ageGroup || 'all') } }
                // const query4 = { targetGroup: { gender: (user.gender || 'both'), ageGroup: (user.ageGroup || 'all') } }
                const query1 = { targetGroup: null }
                const query2 = { targetGroup: { gender: user.gender } }
                const query3 = { targetGroup: { gender: 'both' } }
                const query4 = { targetGroup: { ageGroup: user.ageGroup } }
                const query5 = { targetGroup: { ageGroup: 'all' } }
                const query6 = { targetGroup: { gender: user.gender, ageGroup: user.ageGroup } }
                const query7 = { targetGroup: { gender: 'both', ageGroup: user.ageGroup } }
                const query8 = { targetGroup: { gender: user.gender, ageGroup: 'all' } }
                const query9 = { targetGroup: { gender: 'both', ageGroup: 'all' } }
                const query10 = { isPublished: true }

                Survey.find({
                    $and: [{
                        $or: [query1, query2, query3, query4, query5, query6, query7, query8, query9]
                    }, 
                    {
                        $or: [query10]
                    }
                    ]
                }, function (err, surveys) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        console.log('before', surveys);
                        surveys.map(function(item) {
                            if (user.surveysTaken.indexOf(item._id.toString()) !== -1) {
                                item['surveyTaken'] = true;
                            } else {
                                item['surveyTaken'] = false;
                            }
                        });
                        console.log('after', surveys);
                        // iterate user object and send which surveys are taken;
                        res.status(200).send({ surveys: surveys });
                    }
                });
            }
        });
    }
});

surveyRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        Survey.findById(id, function (err, survey) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                res.status(200).send({ survey: survey });
            }
        });
    }
});

surveyRoutes.route('/update/:id').post(function (req, res) {
    let body = req.body;
    const jwtTokenObject = Utility.validateToken(req.headers);
    if (jwtTokenObject === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        Survey.findById(req.params.id, function (err, survey) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                User.find({ _id: survey.publisherId }, function (err, user) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        if (user[0].email === jwtTokenObject.email) {
                            Object.keys(body).forEach(function (key) {
                                survey[key] = body[key];
                            });
                            survey.save()
                                .then(survey => {
                                    res.status(200).json({ 'message': 'survey updated successfully', data: survey });
                                })
                                .catch(err => {
                                    res.status(500).send({ error: err });
                                });
                        } else {
                            res.status(401).send({ error: 'Unauthorized to update this survey' });
                        }
                    };
                });
            }
        });
    }
});

module.exports = surveyRoutes;