const bcrypt = require('bcrypt');
const { isNil } = require('lodash');
const UserService = require('../services/user-service');
const Utility = require('../utilities/utility');
var User = require('../models/user');

exports.signUpUser = async function (req, res) {
    try {
        var existingUser = await UserService.getUserByQuery({ email: req.body.email })
        if (isNil(existingUser)) {
            let user = new User(req.body);
            user.token = Utility.createToken(req.body.email);
            var result = await UserService.saveUser(user);
            return res.status(200).json({ status: 200, user: result, message: "User successfully signed up." });
        } else {
            return res.status(400).json({ status: 400, errorMessage: 'User already exists with this email id' });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;
        var user = await UserService.getUserByQuery({ email: email })
        if (isNil(user)) {
            return res.status(400).json({ status: 400, errorMessage: 'User does not exists with this email id' });
        }
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                var payload = user.toObject();
                delete payload.password;
                payload.token = user.token;
                return res.status(200).json({ status: 200, user: payload, message: "Succesfully Logged in." });
            } else {
                return res.status(400).json({ status: 400, errorMessage: 'Incorrect password' });
            }
        });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.submitSurvey = async function (req, res) {
    try {
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail })
        const surveysTaken = user.surveysTaken || [];
        let surveyAlreadyTaken = false;
        for (let m = 0; m < surveysTaken.length; m++) {
            if (surveysTaken[m].surveyId === body.surveyId) {
                surveyAlreadyTaken = true;
                break;
            }
        }
        if (surveyAlreadyTaken) {
            return res.status(400).json({ status: 400, errorMessage: 'You have already submitted response to this survey earlier' });
        } else {
            user.surveysTaken.push(body);
            var result = await UserService.saveUser(user);
            res.status(200).json({ 'message': 'Your response has been submitted successfully', data: result });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getUserProfile = async function (req, res) {
    try {
        var user = await UserService.getUserByQuery({ email: req.authenticatedEmail })
        return res.status(200).json({ status: 200, user: user, message: "Succesfully User Profile Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getUsers = async function (req, res) {
    try {
        var users = await UserService.getAllUsers()
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}
