const express = require('express');
const userRoutes = express.Router();
const Utility = require('../utilities/utility');

var UserController = require('../controllers/user-controller');

userRoutes.post('/login', UserController.loginUser);
userRoutes.post('/signup', UserController.signUpUser);
userRoutes.get('/getProfile', Utility.verifyToken, UserController.getUserProfile);
userRoutes.get('/getAllUsers', UserController.getUsers); // Only for testing purpose

module.exports = userRoutes;