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
import logo from "../logo.png";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        gender: null,
        age_group: null,
        role: null
      },
      errorObject: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.navigateToLoginPage = this.navigateToLoginPage.bind(this);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
  }

  render() {
    const { errorObject, errorMessage } = this.state;
    return (
      <Row>
        <Col xs={10} sm={4} className={'offset-sm-4 offset-1 '}>
        <img className='login-signup-logo' src={logo} alt={'logo'}></img>
          <Card className='login-signup-container '>
            <Label className='login-signup-header-label'>Sign up</Label>
            <form noValidate autoComplete="off">
              <CustomInput
                label={"Name"}
                id={"name"}
                ref={this.nameRef}
                mandatory={true}
                prependAddon='fa-user'
                errorMessage={errorObject.nameError}
              />
              <CustomInput
                label={"Email Id"}
                id={"email"}
                ref={this.emailRef}
                mandatory={true}
                prependAddon='fa-envelope'
                errorMessage={errorObject.emailError}
              />
              <CustomInput
                label={"Password"}
                id={"password"}
                ref={this.passwordRef}
                mandatory={true}
                type={"password"}
                prependAddon='fa-lock'
                errorMessage={errorObject.passwordError}
              />
              <CustomInput
                label={"Confirm Password"}
                id={"confirmPassword"}
                ref={this.confirmPasswordRef}
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
                    id={"age_group"}
                    mandatory={true}
                    onChange={this.handleChange}
                    values={Constant.age_group}
                    errorMessage={errorObject.age_groupError}
                  />
              }
              {
                this.state.showSpinner ? <SpinnerComponent /> :
                  <CustomButton
                    label={"Sign Up"}
                    id={"signup"}
                    onClick={this.handleSubmit}
                    color={"primary"}
                    style={{ margin: '24px auto auto', width: '100%' }}
                  />
              }
              <CustomError style={{width: '100%', textAlign: 'center'}} errorMessage={errorMessage} />
              {this.renderLoginLink()}
            </form>
          </Card>
        </Col>
      </Row>
    );
  }

  renderLoginLink() {
    return <div className='login-signup-footer'>
      <hr className='divider'></hr>
      <Label className='label'
        >Existing user? <span className='custom-link' onClick={this.navigateToLoginPage}>Login</span></Label>
    </div>
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
    state.data.name = this.nameRef.current['reference'].current.value;
    state.data.email = this.emailRef.current['reference'].current.value;
    state.data.password = this.passwordRef.current['reference'].current.value;
    state.data.confirmPassword = this.confirmPasswordRef.current['reference'].current.value;
    state.errorMessage = null; //refresh this on every check
    this.setState(state, this.validateData);
  }

  validateData() {
    const state = this.state;
    for (let [key, value] of Object.entries(state.data)) {
      state.errorObject[key + "Error"] = Utility.validateInputFields(key, value);
    }
    state.errorObject['emailError'] = Utility.validateEmail(state.data.email); //validate email pattern
    state.errorObject.confirmPasswordError = Utility.validateNewAndConfirmPassword(state.data.password, state.data.confirmPassword);
    this.setState(state, this.proceed);
  }

  proceed() {
    const state = this.state;
    const errorObject = state.errorObject;
    let formError = false;
    for (let [key, value] of Object.entries(errorObject)) {
      errorObject[key] = value;
      if (!isNil(errorObject[key])) {
        if (this.state.data.role !== 'respondant') {
          if (key === 'genderError' || key === 'age_groupError') {
            formError = false; // gender and age_group not required for roles other than respondant
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
    if (!isNil(res.data.errorMessage)) {
      this.setState({
        errorMessage: res.data.errorMessage,
        showSpinner: false
      })
    } else {
      Utility.storeToken(res.data.user.token);
      this.navigateToHomePage()
    }
  }
}