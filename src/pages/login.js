import React, { Component } from 'react';
import { Row, Col, Card, Label } from 'reactstrap';
import { isNil } from 'lodash';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import CustomButton from '../custom-components/custom-button';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import Utility from '../utilities/utility';

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
  }

  render() {
    const { errorObject, errorMessage } = this.state;
    return (
      <Row>
        <Col xs={8} className={'offset-2'}>
          <Card style={{ padding: '32px', background: 'lightgrey' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
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
                    style={{ margin: '24px auto auto', width: '144px' }}
                  />
              }
              <CustomError errorMessage={errorMessage} />
              {this.renderSignUpLink()}
            </form>
          </Card>
        </Col>
      </Row>
    );
  }

  renderSignUpLink() {
    return <Label style={{ color: 'blue', cursor: 'pointer' }}
      onClick={this.navigateToSignUpPage}>New User?</Label>
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
    state.data.email = this.refs.email['reference'].current.value;
    state.data.password = this.refs.password['reference'].current.value;
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
      if (!isNil(res.data.error)) {
        console.log('failure', res);
        this.setState({
          errorMessage: res.data.error,
          showSpinner: false
        })
      } else {
        Utility.storeToken(res.data.user.token);
        this.navigateToHomePage();
      }
  }
}