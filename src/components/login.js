import React, { Component } from 'react';
import axios from 'axios';
import CustomInput from '../custom-components/custom-input';
import CustomButton from '../custom-components/custom-button';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
          label={"Email Id"}
          id={"userEmail"}
          ref={"userEmail"}
        />
        <CustomInput
          label={"Password"}
          id={"password"}
          ref={"password"}
          type={"password"}
        />
        <CustomButton
          label={"Login"}
          id={"login"}
          onClick={this.handleSubmit}
          color={"primary"}
        />
      </form>
    );
  }

  handleSubmit(e) {
    const userObj = {
      user_email: this.refs.userEmail['reference'].current.value,
      userPassword: this.refs.newPassowrd['reference'].current.value
    };
    if (this.validate(userObj)) {
      this.loginUser(userObj);
    }
  }

  validate() {
    return true;
  }

  loginUser(userObj) {
    console.log('obj', userObj);
    axios.post('http://localhost:8080/user/login', userObj)
      .then(res => console.log(res.data));
  }
}