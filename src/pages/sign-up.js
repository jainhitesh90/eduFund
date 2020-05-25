import React, { Component } from 'react';
import { Row, Col, Card, Label } from 'reactstrap';
import { isNil } from 'lodash';
import CustomInput from '../custom-components/custom-input';
import CustomButton from '../custom-components/custom-button';
import CustomDropDown from '../custom-components/custom-dropdown';
import CustomError from '../custom-components/custom-error';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import Utility from '../utilities/utility';
import Constant from '../utilities/constant';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        gender: null,
        ageGroup: null,
        role: null
      },
      errorObject: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.navigateToLoginPage = this.navigateToLoginPage.bind(this);
  }

  render() {
    const { errorObject, errorMessage } = this.state;
    return (
      <Row>
        <Col xs={8} className={'offset-2'}>
          <Card style={{ padding: '32px', background: 'lightgrey' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
              <CustomInput
                label={"Name"}
                id={"name"}
                ref={"name"}
                mandatory={true}
                prependAddon='fa-user'
                errorMessage={errorObject.nameError}
              />
              <CustomInput
                label={"Email Id"}
                id={"email"}
                ref={"email"}
                mandatory={true}
                prependAddon='fa-envelope'
                errorMessage={errorObject.emailError}
              />
              <CustomInput
                label={"Password"}
                id={"password"}
                ref={"password"}
                mandatory={true}
                type={"password"}
                prependAddon='fa-lock'
                errorMessage={errorObject.passwordError}
              />
              <CustomInput
                label={"Confirm Password"}
                id={"confirmPassword"}
                ref={"confirmPassword"}
                mandatory={true}
                type={"password"}
                prependAddon='fa-lock'
                errorMessage={errorObject.confirmPasswordError}
              />
              <CustomDropDown
                label={"Role"}
                id={"role"}
                mandatory={true}
                onChange={this.handleChange}
                values={Constant.roles}
                errorMessage={errorObject.roleError}
              />
              {
                this.state.data.role !== 'respondant' ? null :
                  <CustomDropDown
                    label={"Gender"}
                    id={"gender"}
                    mandatory={true}
                    onChange={this.handleChange}
                    values={Constant.gender}
                    errorMessage={errorObject.genderError}
                  />
              }
              {
                this.state.data.role !== 'respondant' ? null :
                  <CustomDropDown
                    label={"Age Group"}
                    id={"ageGroup"}
                    mandatory={true}
                    onChange={this.handleChange}
                    values={Constant.ageGroup}
                    errorMessage={errorObject.ageGroupError}
                  />
              }
              {
                this.state.showSpinner ? <SpinnerComponent /> :
                  <CustomButton
                    label={"Sign Up"}
                    id={"signup"}
                    onClick={this.handleSubmit}
                    color={"primary"}
                    style={{ margin: '24px auto auto', width: '144px' }}
                  />
              }
              <CustomError errorMessage={errorMessage} />
              {this.renderLoginLink()}
            </form>
          </Card>
        </Col>
      </Row>
    );
  }

  renderLoginLink() {
    return <Label style={{ color: 'blue', cursor: 'pointer' }}
      onClick={this.navigateToLoginPage}>Existing User?</Label>
  }

  navigateToLoginPage() {
    this.props.history.push({
      pathname: '/login'
    })
  }

  navigateToHomePage() {
    this.props.history.push({
      pathname: '/'
    })
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
    state.errorMessage = null; //refresh this on every check
    this.setState(state, this.validateData);
  }

  validateData() {
    const state = this.state;
    console.log('validating', state.data);
    for (let [key, value] of Object.entries(state.data)) {
      console.log(key, value);
      state.errorObject[key + "Error"] = Utility.validateInputFields(key, value);
    }
    state.errorObject['emailError'] = Utility.validateEmail(state.data.email); //validate email pattern
    state.errorObject.confirmPasswordError = Utility.validateNewAndConfirmPassword(state.data.password, state.data.confirmPassword);
    this.setState(state, this.proceed);
  }

  proceed() {
    const state = this.state;
    const errorObject = state.errorObject;
    console.log('errorObject', errorObject);
    let formError = false;
    for (let [key, value] of Object.entries(errorObject)) {
      errorObject[key] = value;
      if (!isNil(errorObject[key])) {
        if (this.state.data.role !== 'respondant') {
          if (key === 'genderError' || key === 'ageGroupError') {
            formError = false; // gender and ageGroup not required for roles other than respondant
          } else {
            formError = true;
            break;
          }
        } else {
          formError = true;
          break;
        }
      }
    }
    if (!formError && isNil(this.state.errorMessage)) {
      state.showSpinner = true;
      this.setState(state, this.signUpUser);
    }
  }

  signUpUser = async () => {
    const res = await ApiHelper.postData('/user/signup', this.state.data);
    if (!isNil(res.data.error)) {
      this.setState({
        errorMessage: res.data.error,
        showSpinner: false
      })
    } else {
      Utility.storeToken(res.data.user.token);
      this.navigateToHomePage()
    }
  }
}