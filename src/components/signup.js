import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, RadioGroup, Radio, FormLabel, Select, MenuItem } from '@material-ui/core';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userName = React.createRef();
        this.userEmail = React.createRef();
        this.userPassword = React.createRef();
    }

    render() {
        return (
            this.renderLoginForm()
        )
    }

    renderLoginForm() {
        return (
            <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
                <TextField inputRef={(ref) => {this.userName = ref}} id="outlined-basic" label="Name" variant="outlined" />
                <TextField inputRef={(ref) => {this.userEmail = ref}} id="outlined-basic" label="Email Id" type="email" variant="outlined" />
                <FormLabel id="demo-simple-select-label">Age</FormLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={this.handleAgeChange}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" onChange={this.handleGenderChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <TextField inputRef={(ref) => {this.userPassword = ref}} id="outlined-basic" label="Password" variant="outlined" type="password" />
                <Button onClick={this.handleSubmit} variant="contained" color="primary">Sign Up</Button>
            </form>
        );
    }

    handleGenderChange(e) {
        console.log("valie", e.target.value)
        this.setState({
            gender: e.target.value
        }, () => { console.log('state', this.state) });
    }

    handleAgeChange(e) {
        console.log("valie", e.target.value)
        this.setState({
            age: e.target.value
        }, () => { console.log('state', this.state) });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.userName.value);
        console.log(this.userEmail.value);
        console.log(this.userPassword.value);
        const userObj = {
            user_name: this.userName.value,
            user_email: this.userEmail.value,
            userPassword: this.userPassword.value,
            user_age: this.state.age,
            gender: this.state.gender
        };
        if (this.validate(userObj)) {
            this.signupNewUser(userObj);
        }
      }

    validate() {
        return true;
    }

    signupNewUser(userObj) {
        axios.post('http://localhost:8080/user/add', userObj)
            .then(res => console.log(res.data));
    }
}