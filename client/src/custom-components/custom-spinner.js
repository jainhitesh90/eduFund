import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export default class CustomSpinner extends Component {
    render() {
        return (
            <Spinner className={'small-spinner '} />
        );
    }
}