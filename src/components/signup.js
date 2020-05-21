import React, { Component } from 'react';
import axios from 'axios';
import CustomInput from './../custom-components/custom-input';
import CustomButton from './../custom-components/custom-button';
import CustomRadioGroup from './../custom-components/custom-radio-group';
import CustomDropDown from '../custom-components/custom-dropdown';

const gender = [
    {key: 'male', value: 'Male'}, 
    {key: 'female', value: 'Female'},
    {key: 'other', value: 'Other'}
];

const ageGroup = [
    {key: 'less-than-16', value: '< 16'}, 
    {key: '16-to-25', value: '16 to 25'},
    {key: '25-to-35', value: '25 to 35'},
    {key: 'above-35', value: '> 35'}
];

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            this.renderLoginForm()
        )
    }

    renderLoginForm() {
        return (
            <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
                <CustomInput
                    label={"Name"}
                    id={"userName"}
                    ref={"userName"}
                />
                <CustomInput
                    label={"Email Id"}
                    id={"userEmail"}
                    ref={"userEmail"}
                />
                <CustomDropDown
                    label={"Age Group"}
                    id={"ageGroup"}
                    onChange={this.handleAgeChange}
                    values={ageGroup}
                />
                <CustomRadioGroup
                    label={"Gender"}
                    id={"gender"}
                    onChange={this.handleGenderChange}
                    values={gender}
                />
                <CustomInput
                    label={"New Password"}
                    id={"newPassowrd"}
                    ref={"newPassowrd"}
                    type={"password"}
                />
                <CustomInput
                    label={"Confirm Password"}
                    id={"confirmPassowrd"}
                    ref={"confirmPassowrd"}
                    type={"password"}
                />
                <CustomButton
                    label={"Sign Up"}
                    id={"signup"}
                    onClick={this.handleSubmit}
                    color={"primary"}
                />
            </form>
        );
    }

    handleGenderChange(e) {
        this.setState({
            gender: e.target.value
        });
    }

    handleAgeChange(e) {
        this.setState({
            age: e.target.value
        });
    }

    handleSubmit(e) {
        const userObj = {
            user_name: this.refs.userName['reference'].current.value,
            user_email: this.refs.userEmail['reference'].current.value,
            userPassword: this.refs.newPassowrd['reference'].current.value,
            user_age: this.state.age,
            gender: this.state.gender
        };
        if (this.validate(userObj)) {
            this.signupNewUser(userObj);
        }
    }

    validate() {
        return true;
    }

    signupNewUser(userObj) {
        console.log('obj', userObj);
        axios.post('http://localhost:8080/user/add', userObj)
            .then(res => console.log(res.data));
    }
}