import React, { Component } from 'react';
import axios from 'axios';
import CustomInput from './../custom-components/custom-input';
import CustomButton from './../custom-components/custom-button';
import CustomRadioGroup from './../custom-components/custom-radio-group';
import CustomDropDown from '../custom-components/custom-dropdown';
import CustomError from '../custom-components/custom-error';
import { Row, Col } from 'reactstrap';
import Utility from './../utilities/utility';
import Constant from './../utilities/constant';
import { isNil } from 'lodash';
import { Redirect } from 'react-router';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errorObject: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    //TODO need to check this way of routing again.
    if (this.state.redirectToHome === true) {
      return <Redirect to='/home' />
    }
    return (
      this.renderSignupForm()
    )
  }

  renderSignupForm() {
    const {errorObject, errorMessage} = this.state;
    return (
      <div style={{ padding: '16px', background: 'lightgrey' }}>
        <Row>
          <Col xs={6} className={'offset-3'}>
            {/* <CustomGlobalError showError={showError} errorMessage={errorMessage} /> */}
            <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
              <CustomInput
                label={"Name"}
                id={"name"}
                ref={"name"}
                errorMessage={errorObject.nameError}
              />
              <CustomInput
                label={"Email Id"}
                id={"email"}
                ref={"email"}
                errorMessage={errorObject.emailError}
              />
              <CustomRadioGroup
                label={"Gender"}
                id={"gender"}
                onChange={this.handleChange}
                values={Constant.gender}
                errorMessage={errorObject.genderError}
              />
              <CustomDropDown
                label={"Age Group"}
                id={"ageGroup"}
                onChange={this.handleChange}
                values={Constant.ageGroup}
                errorMessage={errorObject.ageGroupError}
              />
              <CustomRadioGroup
                label={"Role"}
                id={"role"}
                onChange={this.handleChange}
                values={Constant.roles}
                errorMessage={errorObject.roleError}
              />
              <CustomInput
                label={"Password"}
                id={"password"}
                ref={"password"}
                type={"password"}
                errorMessage={errorObject.passwordError}
              />
              <CustomInput
                label={"Confirm Password"}
                id={"confirmPassword"}
                ref={"confirmPassword"}
                type={"password"}
                errorMessage={errorObject.confirmPasswordError}
              />
              <CustomButton
                label={"Sign Up"}
                id={"signup"}
                onClick={this.handleSubmit}
                color={"primary"}
              />
              <CustomError errorMessage={errorMessage} />
            </form>
          </Col>
        </Row>
      </div>
    );
  }

  handleChange(key, value) {
    const state = this.state;
    state.data[key] = value;
    this.setState(state);
  }

  handleSubmit() {
    const state = this.state;
    state.data.name = this.refs.name['reference'].current.value;
    state.data.email = this.refs.email['reference'].current.value;
    state.data.password = this.refs.password['reference'].current.value;
    state.data.confirmPassword = this.refs.confirmPassword['reference'].current.value;
    state.data.ageGroup = state.data.ageGroup;
    state.data.role = state.data.role;
    state.data.gender = state.data.gender;
    state.errorMessage = null; //refresh this on every check
    this.setState(state, this.validateData);
  }

  validateData() {
    const state = this.state;
    for (let [key, value] of Object.entries(state.data)) {
      state.errorObject[key + "Error"] = Utility.validateInputFields(key, value);
    }
    this.setState(state, this.proceed);
  }

  proceed() {
    const state = this.state;
    const errorObject = state.errorObject;
    let formError = false;
    for (let [key, value] of Object.entries(errorObject)) {
      errorObject[key] = value;
      if (!isNil(errorObject[key])) {
        formError = true;
        break;
      }
    }
    if (!formError) {
      state.errorMessage = Utility.validateNewAndConfirmPassword(state.data.password, state.data.confirmPassword);
      this.setState(state, this.signUpUser);
    }
  }

  signUpUser() {
    console.log('state', this.state);
    if (isNil(this.state.errorMessage)) {
      axios.post('http://localhost:8080/user/signup', this.state.data).then(res => this.processResult(res.data));
    }
  }

  processResult(res) {
    console.log('res', res);
    if (!isNil(res.error)) {
      this.setState({
        errorMessage: res.error
      })
    } else {
      console.log('successfully signup', res.user);
      this.setState({
        user: res.user,
        errorMessage: null,
        redirectToHome: true
      })
    }
  }
}