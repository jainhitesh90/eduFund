const express = require('express');
const surveyRoutes = express.Router();

let Survey = require('../model/survey');
let User = require('../model/user');
let Utility = require('../utilities/utility');

surveyRoutes.route('/add').post(function (req, res) {
    const token = Utility.validateToken(req.headers);
    if (token === null) {
        res.status(200).send({ error: 'Invalid token' });
    } else {
        let survey = new Survey(req.body);
        User.find({ email: token.email }, function (err, result) {
            if (err) {
                res.status(500).send({ error: err });
            } else if (result.length === 0) {
                res.status(500).send({ error: 'User not found' });
            } else {
                survey.publisherId = result[0]._id;
                survey.isPublished = false;
                survey.save()
                    .then(survey => {
                        res.status(200).json({ data: 'survey added successfully' });
                    })
                    .catch(err => {
                        res.status(500).send({ error: err });
                    });
            }
        });
    }
});

surveyRoutes.route('/getAllSurveys').get(function (req, res) {
    const token = Utility.validateToken(req.headers);
    if (token === null) {
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

surveyRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    const token = Utility.validateToken(req.headers);
    if (token === null) {
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

module.exports = surveyRoutes;