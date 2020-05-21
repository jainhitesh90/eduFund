import React, { Component } from 'react';
import axios from 'axios';
import CustomInput from '../custom-components/custom-input';
import CustomButton from '../custom-components/custom-button';
import { Row, Col } from 'reactstrap';
import { styled } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';

const Container = styled(Col)({
  padding: '16px',
  background: 'lightgrey'
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      passwordError: ''
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
      <Row>
        <Container xs={6} className={'offset-3'}>
          <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
            <CustomInput
              label={"Email Id"}
              id={"email"}
              ref={"email"}
              errorMessage={this.state.emailError}
            />
            <CustomInput
              label={"Password"}
              id={"password"}
              ref={"password"}
              type={"password"}
              errorMessage={this.state.passwordError}
            />
            <CustomButton
              label={"Login"}
              id={"login"}
              onClick={this.handleSubmit}
              color={"primary"}
            />
          </form>
        </Container>
      </Row>
    );
  }

  handleSubmit(e) {
    const userObj = {
      email: this.refs.email['reference'].current.value,
      password: this.refs.password['reference'].current.value
    };
    if (this.validate(userObj)) {
      this.loginUser(userObj);
    }
  }

  validate(userObj) {
    const state = this.state;
    
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
    this.setState({
      state: state
    })

    return true;
  }

  loginUser(userObj) {
    console.log('obj', userObj);
    axios.post('http://localhost:8080/user/login', userObj)
      .then(res => console.log(res.data));
  }
}