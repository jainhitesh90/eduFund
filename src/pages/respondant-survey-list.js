import React, { Component } from 'react';
import { isNil } from 'lodash';
import CustomButton from '../custom-components/custom-button';
import ApiHelper from '../utilities/api-helper';
import { Row, Col } from 'reactstrap';

export default class RespondantSurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: []
        }
        this.getSurveyList = this.getSurveyList.bind(this);
        this.takeSurvey = this.takeSurvey.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getRespondantSurveys');
        console.log('ressss', res);
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
                <p style={{ color: 'blue', paddingTop: '24px' }}>My Survey List here!!</p>
                {!isNil(this.state.error) ? <p style={{ color: 'red' }}>Error : {this.state.error}</p> : null}
                {this.renderSurveyList()}
            </div>
        )
    }

    renderSurveyList() {
        const self = this;
        return this.state.surveys.map(function (item, index) {
            console.log('item', item);
            return <Row key={'survey-' + index}>
                <Col xs={4}>
                    <p>{item.title}</p>
                </Col>
                <Col xs={4}>
                {item.surveyTaken ? <p onClick={() => self.viewMyResponse(item._id)} style={{color: 'blue', cursor: 'pointer'}}>View My Response</p> : <p onClick={() => self.takeSurvey(item._id)} style={{color: 'blue', cursor: 'pointer'}}>Take Survey</p>}
                </Col>
            </Row>
        })
    }

    viewMyResponse(id) {
        console.log('View survey with id', id);
    }

    takeSurvey = async (id) => {
        console.log('Take survey id', id);
        const res = await ApiHelper.postData('/user/takeSurvey', {surveyId: id});
            if (!isNil(res.error)) {
                console.log('failed submitting survey', res.error);
                this.setState({
                    errorMessage: res.error
                })
            } else {
                console.log('survey submitted successfully', res.data);
                // this.setState({
                //     redirectToHome: true
                // })
            }
    }
}