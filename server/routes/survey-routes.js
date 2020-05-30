const express = require('express');
const surveyRoutes = express.Router();

var SurveyController = require('../controllers/survey-controller');
const Utility = require('../utilities/utility');

surveyRoutes.post('/add', Utility.verifyToken, SurveyController.addSurvey);
surveyRoutes.get('/getAllSurveys', Utility.verifyToken, SurveyController.getAllSurveys);
surveyRoutes.post('/update/:id', Utility.verifyToken, SurveyController.updateSurvey);
surveyRoutes.post('/submitSurvey', Utility.verifyToken, SurveyController.submitSurvey);
surveyRoutes.get('/getCoOrindtorSurveys', Utility.verifyToken, SurveyController.getCoOrdinatorsSurveys);
surveyRoutes.get('/getRespondantSurveys', Utility.verifyToken, SurveyController.getRespondantsSurveys);
surveyRoutes.get('/:id', Utility.verifyToken, SurveyController.getSurvey);

module.exports = surveyRoutes;