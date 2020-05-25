const UserService = require('../services/user-service');
const SurveyService = require('../services/survey-service');
var Survey = require('../models/survey');

exports.addSurvey = async function (req, res) {
    try {
        let survey = new Survey(req.body);
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail });
        console.log('user', user);
        survey.publisherId = user._id;
        var result = await SurveyService.saveSurvey(survey);
        res.status(200).json({ 'message': 'Your survey has been addedd successfully', data: result });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getSurvey = async function (req, res) {
    try {
        var survey = await SurveyService.getSurvey({ _id: req.params.id })
        return res.status(200).json({ status: 200, survey: survey, message: "Survey succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getAllSurveys = async function (req, res) {
    try {
        var survey = await SurveyService.getAllSurvey()
        return res.status(200).json({ status: 200, surveys: survey, message: "Survey list succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.updateSurvey = async function (req, res) {
    try {
        var survey = await SurveyService.getSurvey({ _id: req.params.id })
        var user = await UserService.getUserByQuery({ _id: survey.publisherId })
        if (user.email === req.authenticatedEmail) {
            Object.keys(req.body).forEach(function (key) {
                survey[key] = req.body[key];
            });
            SurveyService.saveSurvey(survey);
        } else {
            return res.status(400).json({ status: 400, errorMessage: 'Unauthorized to update this survey' });
        }
        return res.status(200).json({ status: 200, survey: survey, message: "Survey succesfully updated." });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getCoOrdinatorsSurveys = async function (req, res) {
    try {
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail })
        var surveys = await SurveyService.getSurveyListByQuery({ publisherId: user._id })
        return res.status(200).json({ status: 200, surveys: surveys, message: "Survey list succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getRespondantsSurveys = async function (req, res) {
    try {
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail })
        //TODO refactor this query
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
        const query = {
            $and: [{ $or: [query1, query2, query3, query4, query5, query6, query7, query8, query9] }, { $or: [query10] }]
        };
        var surveys = await SurveyService.getSurveyListByQuery(query)
        return res.status(200).json({ status: 200, surveys: surveys, message: "Survey list succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}
