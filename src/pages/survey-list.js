import React, { Component } from 'react';
import { isNil } from 'lodash';
import { Redirect } from 'react-router';
import CustomButton from '../custom-components/custom-button';
import ApiHelper from '../utilities/api-helper';

export default class SurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: []
        }
        this.getSurveyList = this.getSurveyList.bind(this);
        this.onAddNewSurveyClick = this.onAddNewSurveyClick.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getAllSurveys');
        if (!isNil(res.data.surveys)) {
            this.setState({
                surveys: res.data.surveys,
                error: null
            })
        } else {
            this.setState({
                surveys: [],
                error: res.data.error
            })
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/create-survey' />
        }
        return (
            <div style={{ background: 'lightgray', padding: '24px' }}>
                {this.renderAddSurveyButton()}
                <p style={{ color: 'blue', paddingTop: '24px' }}>Survey List here!!</p>
                {!isNil(this.state.error) ? <p style={{ color: 'red' }}>Error : {this.state.error}</p> : null}
                {this.renderSurveyList()}
            </div>
        )
    }

    renderAddSurveyButton() {
        return <CustomButton
            label={"Add New Survey"}
            id={"addSurvey"}
            onClick={this.onAddNewSurveyClick}
            color={"primary"}
        />
    }

    onAddNewSurveyClick() {
        this.setState({
            redirect: true
        });
    }

    renderSurveyList() {
        return this.state.surveys.map(function (item, index) {
            return <p key={'survey-' + index}>{item.name}</p>
        })
    }
}