import {isEmpty, startCase} from 'lodash';

export default class Utility {

    static validateNewAndConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return "Password should be same as Confirm Password"
        }
    }

    static validateInputFields = (key, value) => {
        if (isEmpty(value)) {
            return startCase(key) + " cannot be empty";
        } else {
            return null;
        }
    }
}