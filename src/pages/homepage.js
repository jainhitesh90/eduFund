import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { isNil } from 'lodash';
import RespondantHomePage from '../components/respondant-survey-list';
import CordinatorHomePage from '../components/co-ordinator-survey-list';
import ApiHelper from '../utilities/api-helper';
import Spinner from '../custom-components/custom-spinner';
import Utility from '../utilities/utility';

export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSpinner: true
        }
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentWillMount() {
        this.getUserProfile();
    }

    render() {
        if (isNil(Utility.retrieveToken())) {
            return <Redirect to='/login' />
        } else {
            return this.renderHomePage();
        }
    }

    renderHomePage() {
        const { error, user } = this.state;
        if (this.state.showSpinner) {
            return <Spinner />
        } else {
            if (!isNil(error)) {
                return <p>{error}</p>
            } else {
                if (user.role === 'respondant') {
                    return <RespondantHomePage />
                } else if (user.role === 'co-ordinator') {
                    return <CordinatorHomePage />
                } else {
                    return null;
                }
            }
        }
    }

    getUserProfile = async () => {
        const res = await ApiHelper.getData('/user/getProfile');
        console.log('ressss', res);
        if (!isNil(res.data.user)) {
            this.setState({
                user: res.data.user,
                showSpinner: false,
                error: null
            })
        } else {
            this.setState({
                user: null,
                showSpinner: false,
                error: res.data.error
            })
        }
    }
}