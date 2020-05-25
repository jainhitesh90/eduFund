import React, { Component } from 'react';
import {Label} from 'reactstrap';

export default class ErrorComponent extends Component {
    render() {
        return (
            <Label style={{ color: 'red', fontSize: '24px' }}>404 URL not found</Label>
        );
    }
}