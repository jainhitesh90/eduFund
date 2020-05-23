import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { isNil } from 'lodash';
import { Redirect } from 'react-router';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import CustomButton from '../custom-components/custom-button';
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
  }

  render() {
    //TODO need to check this way of routing again.
    if (this.state.redirectToHome === true) {
      return <Redirect to='/my-surveys' />
    }
    return (
      this.renderLoginForm()
    )
  }

  renderLoginForm() {
    const { errorObject, errorMessage } = this.state;
    return (
      <div style={{ padding: '16px', background: 'lightgrey' }}>
        <Row>
          <Col xs={6} className={'offset-3'}>
            {/* <CustomGlobalError showError={showError} errorMessage={errorMessage} /> */}
            <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
              <CustomInput
                label={"Email Id"}
                id={"email"}
                ref={"email"}
                errorMessage={errorObject.emailError}
              />
              <CustomInput
                label={"Password"}
                id={"password"}
                ref={"password"}
                type={"password"}
                errorMessage={errorObject.passwordError}
              />
              <CustomButton
                label={"Login"}
                id={"login"}
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
      this.setState(state, this.loginUser);
    }
  }

  loginUser() {
    console.log('state', this.state);
    if (isNil(this.state.errorMessage)) {
      ApiHelper.get('/user/login', this.state.data)
    }
  }

  loginUser = async () => {
    console.log('state', this.state);
    if (isNil(this.state.errorMessage)) {
      const res = await ApiHelper.postData('/user/login', this.state.data);
      if (!isNil(res.error)) {
        console.log('failed login', res.error);
        this.setState({
          errorMessage: res.error
        })
      } else {
        console.log('successfully login', res.data.user);
        localStorage.setItem('token', 'Bearer ' + res.data.user.token)
        this.setState({
          user: res.user,
          errorMessage: null,
          redirectToHome: true
        })
      }
    }
  }
}