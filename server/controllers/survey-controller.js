const UserService = require('../services/user-service');
const SurveyService = require('../services/survey-service');
var Survey = require('../models/survey');

exports.addSurvey = async function (req, res) {
    try {
        let survey = new Survey(req.body);
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail, role: 'co-ordinator' });
        survey.publisher_id = user._id;
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
        var user = await UserService.getUserByQuery({ _id: survey.publisher_id })
        if (user.email === req.authenticatedEmail && user.role === 'co-ordinator') {
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

exports.submitSurvey = async function (req, res) {
    try {
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail });
        var survey = await SurveyService.getSurvey({ _id: req.body.surveyId })
        let surveyAlreadyTaken = false;
        for (let m = 0; m < survey.user_responses.length; m++) {
            if (survey.user_responses[m].toString() === user._id.toString() ) {
                surveyAlreadyTaken = false;
                break;
            }
        }
        if (surveyAlreadyTaken) {
            return res.status(400).json({ status: 400, errorMessage: 'You have already submitted response to this survey earlier' });
        } else {
            userResponeData= {userId: user._id, userName: user.name, response: req.body.response}
            survey.user_responses.push(userResponeData);
            SurveyService.saveSurvey(survey);
            res.status(200).json({ 'message': 'Your response has been submitted successfully', data: survey });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getCoOrdinatorsSurveys = async function (req, res) {
    try {
        var coOrdinatorUser = await UserService.getUserByQuery({ email: req.authenticatedEmail })
        var allSurveys = await SurveyService.getSurveyListByQuery({ publisher_id: coOrdinatorUser._id })
        return res.status(200).json({ status: 200, surveys: allSurveys, message: "Survey list succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getRespondantsSurveys = async function (req, res) {
    try {
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail })
        const query1 = { $or: [{ target_group: null }, { target_group: {} }] }
        const query2 =  { 
            $and : [
                { $or : [ 
                    { "target_group.age_group" : null }, 
                    { "target_group.age_group" : 'all' }, 
                    { "target_group.age_group" : user.age_group } ] },
                { $or : [ 
                    { "target_group.gender" : null }, 
                    { "target_group.gender" : 'both' }, 
                    { "target_group.gender" : user.gender } ] }
            ]
         };
        const query3 = { is_published: true }
        const query = {
            $and: [{ $or: [query1, query2] }, query3]
        };
        var surveys = await SurveyService.getSurveyListByQuery(query)
        let updatedSurveys = [];
        for (let m = 0; m < surveys.length; m++) {
            let survey = surveys[m].toJSON();
            for (let n = 0; n < survey.user_responses.length; n++) {
                const surveyResponse = survey.user_responses[n];
                if (surveyResponse.userId.toString() === user._id.toString()) {
                    survey.userSurveyResponse = survey.user_responses[n].response;
                }
            }
            updatedSurveys.push(survey);
        }
        return res.status(200).json({ status: 200, surveys: updatedSurveys, message: "Survey list succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}
