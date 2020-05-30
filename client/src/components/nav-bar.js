import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import logo from "../logo.png";
import Utility from '../utilities/utility';

export default class NavBarComponent extends Component {
    render() {
        return (
            <Navbar className='nav-bar custom-nav-bar' expand="md">
                <div>
                    <NavbarBrand href="/"> <img src={logo} width="60" height="40" alt="EduFundLogo" /></NavbarBrand>
                    <NavbarBrand className='nav-bar-title' href="/">EduFund Surveys</NavbarBrand>
                </div>
                <NavbarText className='nav-bar-logout' onClick={this.logout}>Logout</NavbarText>
            </Navbar>
        );
    }

    logout() {
        Utility.deleteToken();
        window.location.replace('/login')
    }
}