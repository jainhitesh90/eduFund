import React, { Component } from 'react';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <p onClick={this.signupNewUser}>HomePage!!</p>
            </div>
        )
        }
}