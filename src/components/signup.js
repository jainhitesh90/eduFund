import React, { Component } from 'react';
import axios from 'axios';
import CustomInput from './../custom-components/custom-input';
import CustomButton from './../custom-components/custom-button';
import CustomRadioGroup from './../custom-components/custom-radio-group';
import CustomDropDown from '../custom-components/custom-dropdown';
import CustomError from '../custom-components/custom-error';
import { Row, Col } from 'reactstrap';
import { styled } from '@material-ui/core/styles';
import Utility from './../utilities/utility';
import { isEmpty } from 'lodash';

const gender = [
  { key: 'male', value: 'Male' },
  { key: 'female', value: 'Female' },
  { key: 'other', value: 'Other' }
];

const ageGroup = [
  { key: 'less-than-16', value: '< 16' },
  { key: '16-to-25', value: '16 to 25' },
  { key: '25-to-35', value: '25 to 35' },
  { key: 'above-35', value: '> 35' }
];

const userType = [
  { key: 'cordinator', value: 'Survey Cordinator' },
  { key: 'respondant', value: 'Survey Respondant' }
];

const Container = styled(Col)({
  padding: '16px',
  background: 'lightgrey'
});

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameError: '',
      emailError: '',
      newPasswordError: '',
      confirmPasswordError: '',
      ageGroupError: '',
      genderError: '',
      userTypeError: '',
      errorMessage: ''
    }
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      this.renderSignupForm()
    )
  }

  renderSignupForm() {
    return (
      <Row>
        <Container xs={6} className={'offset-3'}>
          <CustomError errorMessage={this.state.errorMessage} />
          <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
            <CustomInput
              label={"Name"}
              id={"userName"}
              ref={"userName"}
              errorMessage={this.state.nameError}
            />
            <CustomInput
              label={"Email Id"}
              id={"userEmail"}
              ref={"userEmail"}
              errorMessage={this.state.emailError}
            />
            <CustomInput
              label={"New Password"}
              id={"newPassword"}
              ref={"newPassword"}
              type={"password"}
              errorMessage={this.state.newPasswordError}
            />
            <CustomInput
              label={"Confirm Password"}
              id={"confirmPassword"}
              ref={"confirmPassword"}
              type={"password"}
              errorMessage={this.state.confirmPasswordError}
            />
            <CustomDropDown
              label={"Age Group"}
              id={"ageGroup"}
              onChange={this.handleAgeChange}
              values={ageGroup}
              errorMessage={this.state.ageGroupError}
            />
            <CustomRadioGroup
              label={"Gender"}
              id={"gender"}
              onChange={this.handleGenderChange}
              values={gender}
              errorMessage={this.state.genderError}
            />
            <CustomRadioGroup
              label={"User Type"}
              id={"userType"}
              onChange={this.handleUserTypeChange}
              values={userType}
              errorMessage={this.state.userTypeError}
            />
            <CustomButton
              label={"Sign Up"}
              id={"signup"}
              onClick={this.handleSubmit}
              color={"primary"}
            />
          </form>
        </Container>
      </Row>
    );
  }

  handleGenderChange(e) {
    this.setState({
      gender: e.target.value
    });
  }

  handleAgeChange(e) {
    this.setState({
      ageGroup: e.target.value
    });
  }

  handleUserTypeChange(e) {
    this.setState({
      userType: e.target.value
    });
  }

  handleSubmit(e) {
    const userObj = {
      name: this.refs.userName['reference'].current.value,
      email: this.refs.userEmail['reference'].current.value,
      password: this.refs.newPassword['reference'].current.value,
      confirmPassword: this.refs.confirmPassword['reference'].current.value,
      ageGroup: this.state.ageGroup,
      userType: this.state.userType,
      gender: this.state.gender
    };
    if (this.validate(userObj)) {
      this.signupNewUser(userObj);
    }
  }

  validate(userObj) {
    const state = this.state;
    if (isEmpty(userObj.name)) {
      state['nameError'] = 'Name cannot be empty';
    } else {
      state['nameError'] = '';
    }

    if (isEmpty(userObj.email)) {
      state['emailError'] = 'Email cannot be empty';
    } else {
      state['emailError'] = '';
    }

    if (isEmpty(userObj.password)) {
      state['newPasswordError'] = 'Password cannot be empty';
    } else {
      state['newPasswordError'] = '';
    }

    if (isEmpty(userObj.confirmPassword)) {
      state['confirmPasswordError'] = 'Confirm Password cannot be empty';
    } else {
      state['confirmPasswordError'] = '';
    }

    if (isEmpty(userObj.ageGroup)) {
      state['ageGroupError'] = 'Please select Age group';
    } else {
      state['ageGroupError'] = '';
    }

    if (isEmpty(userObj.userType)) {
      state['userTypeError'] = 'Please select User Type';
    } else {
      state['userTypeError'] = '';
    }

    if (isEmpty(userObj.gender)) {
      state['genderError'] = 'Please select Gender';
    } else {
      state['genderError'] = '';
    }

    if (Utility.validateNewAndConfirmPassword(userObj.password, userObj.confirmPassword)) {
      state['errorMessage'] = 'New Password is not same as Confirm Password!'
    }

    this.setState({
      state: state
    })

    return true;
  }

  signupNewUser(userObj) {
    console.log('obj', userObj);
    axios.post('http://localhost:8080/user/signup', userObj)
      .then(res => console.log(res.data));
  }
}