import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavbarText } from 'reactstrap';
import logo from "../logo.svg";
import Utility from '../utilities/utility';

export default class NavBarComponent extends Component {
    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"> <img src={logo} width="30" height="30" alt="EduFundLogo" /></NavbarBrand>
                <NavbarBrand href="/">EduFund Surveys</NavbarBrand>
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="mr-auto" navbar></Nav>
                    <NavbarText onClick={this.logout} style={{ cursor: 'pointer' }}>Logout</NavbarText>
                </Collapse>
            </Navbar>
        );
    }

    logout() {
        Utility.deleteToken();
        console.log('Logged Out');
        window.location.replace('/login')
      }
}