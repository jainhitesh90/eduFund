import { isEmpty, startCase } from 'lodash';

const validateNewAndConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return "Password should be same as Confirm Password"
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
    validateNewAndConfirmPassword, validateInputFields
};