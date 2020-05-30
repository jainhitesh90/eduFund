const bcrypt = require('bcrypt');
const { isNil } = require('lodash');

var User = require('../models/user');
const UserService = require('../services/user-service');
const Utility = require('../utilities/utility');

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
        console.log('login 1', email, password);
        var user = await UserService.getUserByQuery({ email: email })
        console.log('login 2', user);
        if (isNil(user)) {
            console.log('login 3', 'user nil');
            return res.status(400).json({ status: 400, errorMessage: 'User does not exists with this email id' });
        }
        console.log('login 4', 'encrypting');
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                var payload = user.toObject();
                delete payload.password;
                payload.token = user.token;
                return res.status(200).json({ status: 200, user: payload, message: "Succesfully Logged in." });
            } else {
                return res.status(400).json({ status: 400, errorMessage: 'Please enter a valid password.' });
            }
        });
    } catch (e) {
        console.log('login 5', 'error', e);
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

// Testing purpose
exports.getUsers = async function (req, res) {
    try {
        var users = await UserService.getAllUsers()
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}
