import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import ApiHelper from '../utilities/api-helper';
import { Row, Col, Label } from 'reactstrap';
import TakeSurveyModal from '../components/take-survey-modal';
import SurveyResponseModal from '../components/survey-response-modal';
import SpinnerComponent from '../custom-components/custom-spinner';
import CustomError from '../custom-components/custom-error';

export default class RespondantSurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: [],
            showTakeSurveyModal: false,
            showSurveyResponseModal: false,
            showSpinner: true
        }
        this.getSurveyList = this.getSurveyList.bind(this);
        this.takeSurvey = this.takeSurvey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    render() {
        return (
            <div>
                {this.renderTakeSurveyModal()}
                {this.renderSurveyResponseModal()}
                <div className='survey-list-container'>
                    <CustomError errorMessage={this.state.error} />
                    {this.renderSurveyList()}
                </div>
            </div>
        )
    }

    renderTakeSurveyModal() {
        if (this.state.showTakeSurveyModal) {
            return <TakeSurveyModal
                showModal={this.state.showTakeSurveyModal}
                survey={this.state.survey}
                onCancel={() => this.setState({ showTakeSurveyModal: false })}
                onSubmit={this.onSubmit}
            />
        }
    }

    renderSurveyResponseModal() {
        if (this.state.showSurveyResponseModal) {
            return <SurveyResponseModal
                showModal={this.state.showSurveyResponseModal}
                survey={this.state.survey}
                onClick={() => this.setState({ showSurveyResponseModal: false })}
            />
        }
    }

    renderSurveyList() {
        const self = this;
        const { surveys } = this.state;
        if (this.state.showSpinner) {
            return <SpinnerComponent />
        } else return <div>
            <p className='header'>Eligible Surveys!!</p>
            {
                isEmpty(surveys) ? <CustomError errorMessage={'No Surveys eligible for you till now'} /> : 
                <div className='survey-list-table'>
                    {
                        surveys.map(function (item, index) {
                            return <div className='survey-item' key={'survey-' + index}>
                                <Row className='survey-item'>
                                <Col xs={8}>
                                    <Label className='survey-item-title'>{index + 1 + ') ' + item.title}</Label>
                                </Col>
                                <Col xs={4}>
                                    {!isNil(item.userSurveyResponse) ?
                                        <Label onClick={() => self.viewMyResponse(item)} className='survey-item-action'>
                                            View My Response
                                        </Label> :
                                        <Label onClick={() => self.takeSurvey(item)} className='survey-item-action'>
                                            Take Survey
                                        </Label>}
                                </Col>
                            </Row>
                                </div>
                            
                        })
                    }
                </div>
            }
        </div>
    }

    viewMyResponse(survey) {
        this.setState({
            showSurveyResponseModal: true,
            survey: survey
        })
    }

    takeSurvey(survey) {
        this.setState({
            showTakeSurveyModal: true,
            survey: survey
        })
    }

    onSubmit() {
        this.getSurveyList();
        this.setState({
            showTakeSurveyModal: false
        });
    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getRespondantSurveys');
        if (!isNil(res.data.surveys)) {
            this.setState({
                surveys: res.data.surveys,
                error: null,
                showSpinner: false
            })
        } else {
            this.setState({
                surveys: [],
                error: res.data.error,
                showSpinner: false
            })
        }
    }
}