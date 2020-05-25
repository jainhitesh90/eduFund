import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import ApiHelper from '../utilities/api-helper';
import { Row, Col } from 'reactstrap';
import TakeSurveyModal from '../components/take-survey-modal';
import SurveyResponseModal from '../components/survey-response-modal';
import SpinnerComponent from '../custom-components/custom-spinner';

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
    }

    componentWillMount() {
        this.getSurveyList();
    }

    render() {
        return (
            <div>
                {this.renderTakeSurveyModal()}
                {this.renderSurveyResponseModal()}
                <div style={{ background: 'lightgray', padding: '24px' }}>
                    {!isNil(this.state.error) ? <p style={{ color: 'red' }}>Error : {this.state.error}</p> : null}
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
                onClick={() => this.setState({ showTakeSurveyModal: false })}
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
        } else if (isEmpty(surveys)) {
            return <p style={{ color: 'red', paddingTop: '24px' }}>No Surveys for you till now</p>
        } else return <div>
            <p style={{ color: 'blue', paddingTop: '24px' }}>Respondant Survey List here!!</p>
            {
                surveys.map(function (item, index) {
                    console.log('item', item);
                    return <Row key={'survey-' + index}>
                        <Col xs={4}>
                            <p>{item.title}</p>
                        </Col>
                        <Col xs={4}>
                            {!isNil(item.userSurveyResponse) ?
                                <p onClick={() => self.viewMyResponse(item)} style={{ color: 'blue', cursor: 'pointer' }}>
                                    View My Response
                        </p> :
                                <p onClick={() => self.takeSurvey(item)} style={{ color: 'blue', cursor: 'pointer' }}>
                                    Take Survey
                            </p>}
                        </Col>
                    </Row>
                })
            }
        </div>
    }

    viewMyResponse(survey) {
        this.setState({
            showSurveyResponseModal: true,
            survey: survey
        })
        console.log('View survey with id', survey._id);
    }

    takeSurvey(survey) {
        this.setState({
            showTakeSurveyModal: true,
            survey: survey
        })
        console.log('View survey with id', survey._id);
    }

    onCancel() {
        this.setState({
            showTakeSurveyModal: false
        })
    }

    onSubmit() {
        this.setState({
            showTakeSurveyModal: false
        })
    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getRespondantSurveys');
        console.log('ressss', res);
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