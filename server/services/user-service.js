var User = require('../models/user')

exports.getAllUsers = async function () {
    try {
        return await User.find({})
    } catch (e) {
        throw Error('Error while retrieving users list.')
    }
}

exports.getUserByQuery = async function (query) {
    try {
        return await User.findOne(query)
    } catch (e) {
        throw Error('Error while retrieving user.')
    }
}

exports.saveUser = async function (user) {
    try {
        return await user.save();
    } catch (e) {
        throw Error('Error while saving user.')
    }
}
