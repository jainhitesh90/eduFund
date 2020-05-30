import { isNil, isEmpty, startCase } from 'lodash';
import Constants from './constant';

const validateNewAndConfirmPassword = (password, confirmPassword) => {
    if (isNil(confirmPassword) || isEmpty(confirmPassword)) {
        return "Confirm Password cannot be empty"
    } else if (password !== confirmPassword) {
        return "Password should be same as Confirm Password"
    }
}

const validateEmail = (inputEmail) => {
    var atposition = inputEmail.indexOf("@");
    var dotposition = inputEmail.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= inputEmail.length) {
        return "Please enter valid email id";
    }
}

const validateInputFields = (key, value) => {
    if (isEmpty(value)) {
        return startCase(key) + " cannot be empty";
    } else {
        return null;
    }
}

const getTargetAgeGroupOptions = () => {
    var result = Constants.age_group.concat([{ key: 'all', value: 'All' }]);
    return result;
}

const getTargetGenderOptions = () => {
    var result = Constants.gender.concat([{ key: 'both', value: 'Both' }]);
    return result;
}

const storeToken = (token) => {
    localStorage.setItem('token', 'Bearer ' + token)
}

const retrieveToken = () => {
    const token = localStorage.getItem('token');;
    return token;
}

const deleteToken = () => {
    return localStorage.removeItem('token');
}

export default {
    validateNewAndConfirmPassword, 
    validateInputFields, 
    validateEmail,
    getTargetAgeGroupOptions,
    getTargetGenderOptions,
    storeToken,
    retrieveToken,
    deleteToken
};