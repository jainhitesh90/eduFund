import React, { Component } from 'react';
import { isNil } from 'lodash';
import ApiHelper from '../utilities/api-helper';

export default class SurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: []
        }
        this.getSurveyList = this.getSurveyList.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    getSurveyList = async () => {
        const res = await await ApiHelper.getData('/survey/getAllSurveys');
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
        return (
            <div style={{ background: 'lightgray', padding: '24px' }}>
                <p style={{color: 'yellow'}}>Survey List here!!</p>
                {!isNil(this.state.error) ? <p style={{color: 'red'}}>Error : {this.state.error}</p> : null}
                {this.renderSurveyList()}
            </div>
        )
    }

    renderSurveyList() {
        return this.state.surveys.map(function (item) {
            return <p>{item.name}</p>
        })
    }
}