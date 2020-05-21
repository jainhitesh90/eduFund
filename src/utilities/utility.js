export default class Utility {

    static validateNewAndConfirmPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    }

    // validateNewAndConfirmPassword(password, confirmPassword) {
    //     return password === confirmPassword;
    // }
}