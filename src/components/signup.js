import React, { Component } from 'react';
import axios from 'axios';
import CustomInput from './../custom-components/custom-input';
import CustomButton from './../custom-components/custom-button';
import CustomRadioGroup from './../custom-components/custom-radio-group';
import CustomDropDown from '../custom-components/custom-dropdown';
import CustomError from '../custom-components/custom-error';
import { Row, Col } from 'reactstrap';
import Utility from './../utilities/utility';
import { isEmpty } from 'lodash';
import Constant from './../utilities/constant';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      this.renderSignupForm()
    )
  }

  renderSignupForm() {
    return (
      <div style={{ padding: '16px', background: 'lightgrey' }}>
        <Row>
          <Col xs={6} className={'offset-3'}>
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
              <CustomRadioGroup
                label={"Gender"}
                id={"gender"}
                onChange={this.handleChange}
                values={Constant.gender}
                errorMessage={this.state.genderError}
              />
              <CustomDropDown
                label={"Age Group"}
                id={"ageGroup"}
                onChange={this.handleChange}
                values={Constant.ageGroup}
                errorMessage={this.state.ageGroupError}
              />
              <CustomRadioGroup
                label={"Role"}
                id={"role"}
                onChange={this.handleChange}
                values={Constant.roles}
                errorMessage={this.state.userTypeError}
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
              <CustomButton
                label={"Sign Up"}
                id={"signup"}
                onClick={this.handleSubmit}
                color={"primary"}
              />
            </form>
          </Col>
        </Row>
      </div>
    );
  }

  handleChange(key, value) {
    const state = this.state;
    state[key] = value;
    this.setState(state);
  }

  handleSubmit(e) {
    const userObj = {
      name: this.refs.userName['reference'].current.value,
      email: this.refs.userEmail['reference'].current.value,
      password: this.refs.newPassword['reference'].current.value,
      confirmPassword: this.refs.confirmPassword['reference'].current.value,
      ageGroup: this.state.ageGroup,
      role: this.state.role,
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

    if (isEmpty(userObj.role)) {
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
    // axios.post('http://localhost:8080/user/signup', userObj)
    //   .then(res => console.log(res.data));
  }
}