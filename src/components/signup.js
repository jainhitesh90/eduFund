import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
    render() {
        return (
            <div>
                <p onClick={this.signupNewUser}>Signup!!</p>
            </div>
        )
    }

    signupNewUser() {
        const userObj = {
            user_name : 'Hitesh Jain',
            user_email : 'jainhitesh90@gmail.com',
            user_age : '29',
        }
        axios.post('http://localhost:8080/user/add', userObj)
        .then(res => console.log(res.data));
    }
}