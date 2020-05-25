var Survey = require('../models/survey')

exports.getAllSurvey = async function () {
    try {
        return await Survey.find({})
    } catch (e) {
        throw Error('Error while retrieving survey list.')
    }
}

exports.getSurveyListByQuery = async function (query) {
    try {
        return await Survey.find(query)
    } catch (e) {
        throw Error('Error while retrieving survey.')
    }
}

exports.getSurvey = async function (query) {
    try {
        return await Survey.findOne(query)
    } catch (e) {
        throw Error('Error while retrieving survey.')
    }
}

exports.saveSurvey = async function (survey) {
    try {
        return await survey.save();
    } catch (e) {
        throw Error('Error while saving survey.')
    }
}
