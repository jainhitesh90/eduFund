import React, { Component } from 'react';
import { Row, Col, Card, Label } from 'reactstrap';
import { isNil } from 'lodash';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import CustomButton from '../custom-components/custom-button';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import Utility from '../utilities/utility';
import logo from "../logo.png";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errorObject: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.navigateToSignUpPage = this.navigateToSignUpPage.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  render() {
    const { errorObject, errorMessage } = this.state;
    return (
      <Row>
        <Col xs={10} sm={4} className={'offset-sm-4 offset-1 '}>
        <img className='login-signup-logo' src={logo} alt={'logo'}></img>
          <Card className='login-signup-container '>
            <Label className='login-signup-header-label'>Log in to your account</Label>
            <form noValidate autoComplete="off">
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
                type={"password"}
                mandatory={true}
                prependAddon='fa-lock'
                errorMessage={errorObject.passwordError}
              />
              {
                this.state.showSpinner ? <SpinnerComponent /> :
                  <CustomButton
                    label={"Login"}
                    id={"login"}
                    onClick={this.handleSubmit}
                    color={"primary"}
                    style={{ margin: '24px auto auto', width: '100%' }}
                  />
              }
              <CustomError style={{width: '100%', textAlign: 'center'}} errorMessage={errorMessage} />
              {this.renderSignUpLink()}
            </form>
          </Card>
        </Col>
      </Row>
    );
  }

  renderSignUpLink() {
    return <div className='login-signup-footer'>
      <hr className='divider'></hr>
      <Label className='label'
        >New to Edu Fund? <span className='custom-link' onClick={this.navigateToSignUpPage}>Sign Up</span></Label>
    </div>
  }

  navigateToSignUpPage() {
    this.props.history.push({
      pathname: '/sign-up'
    })
  }

  navigateToHomePage() {
    this.props.history.push({
      pathname: '/'
    })
  }

  handleSubmit() {
    const state = this.state;
    state.data.email = this.emailRef.current['reference'].current.value;
    state.data.password = this.passwordRef.current['reference'].current.value;
    state.errorMessage = null; //refresh this on every check
    this.setState(state, this.validateData);
  }

  validateData() {
    const state = this.state;
    for (let [key, value] of Object.entries(state.data)) {
      state.errorObject[key + "Error"] = Utility.validateInputFields(key, value);
    }
    state.errorObject['emailError'] = Utility.validateEmail(state.data.email); //validate email pattern
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
    if (!formError && isNil(this.state.errorMessage)) {
      state.showSpinner = true;
      this.setState(state, this.loginUser);
    }
  }

  loginUser = async () => {
    const res = await ApiHelper.postData('/user/login', this.state.data);
    if (!isNil(res.data.errorMessage)) {
      this.setState({
        errorMessage: res.data.errorMessage,
        showSpinner: false
      })
    } else {
      Utility.storeToken(res.data.user.token);
      this.navigateToHomePage();
    }
  }
}