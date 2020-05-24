import { isEmpty, startCase } from 'lodash';

const validateNewAndConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
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

export default {
    validateNewAndConfirmPassword, validateInputFields, validateEmail
};