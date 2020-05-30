import React, { Component } from 'react';
import { isNil, isEmpty, startCase } from 'lodash';
import { Row, Col, Label, Card } from 'reactstrap';
import CustomModal from '../custom-components/custom-modal';

export default class ViewSurveyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            targetModalData: !isNil(props.survey) ? props.survey.target_group || {} : {},
            questions: !isNil(props.survey) ? props.survey.questions || [] : [],
        }
    }

    render() {
        return <CustomModal
            title={'View Survey'}
            showModal={this.props.showModal}
            actionButtonText={'Close'}
            onClick={this.props.onCancel}
            body={this.renderBody()} />
    }

    renderBody() {
        const survey = this.props.survey || {};
        const title = survey.title
        const gender = (survey.target_group || {}).gender
        const age_group = (survey.target_group || {}).age_group
        return (
            <div style={{ padding: '16px', background: 'lightgrey' }}>
                <Row>
                <Col xs={12} sm={6} className={'offset-sm-3 offset-0'}>
                        <form noValidate autoComplete="off">
                            <p className='view-survey-title'>{'Survey Title'}</p>
                            <p className='view-survey-data'>{title}</p>
                            {isNil(gender) && isNil(age_group) ? null : <p className='view-survey-title'>{'Target Group'}</p>}
                            {isNil(gender) ? null : <p className='view-survey-data'>{'Gender : ' + startCase(gender)}</p>}
                            {isNil(age_group) ? null : <p className='view-survey-data'>{'Age Group : ' + startCase(age_group)}</p>}
                            {this.renderQuestionsSection()}
                            {this.renderSurveyResponseSection()}
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }

    renderQuestionsSection() {
        const self = this, { questions } = this.state;
        return <div>
            <span>
                <Label className='view-survey-title'>{'Survey questions'}</Label>
            </span>
            {questions.map(function (item, index) {
                return self.renderSingleQuestionSection(item, index)
            })}
        </div>
    }

    renderSingleQuestionSection(item, index) {
        return <Card style={{ padding: '8px' }}>
            <div className='edit-survey-question-section'>
                <Label className='survey-question'>{index + 1}) {item.question}</Label>
            </div>
            {item.options.map(function (option, optionIndex) {
                return isNil(option) || isEmpty(option) ? null : <Label className='survey-answer-option'>{String.fromCharCode(97 + optionIndex)}) {option.value}</Label>
            })}
        </Card>
    }

    renderSurveyResponseSection() {
        const surveyResponse = (this.props.survey || {}).user_responses;
        return (
            <div>
                <p className='view-survey-title'>{'Survey Response'}</p>
                <Card style={{ padding: '4px' }}>
                    <p className='co-ordinator-rsurvey-no-of-ppl'>Survey Taken by {surveyResponse.length} people.</p>
                    {this.renderResponseForAllUsers(surveyResponse)}
                </Card>
            </div>

        );
    }

    renderResponseForAllUsers(surveyResponse) {
        const self = this;
        return (
            surveyResponse.map(function (item) {
                return (
                    <div>
                        <p className='co-ordinator-response-user-name'>{item.userName}</p>
                        {self.renderQuestionAndResponseHere(item.response)}
                    </div>
                );
            })
        );
    }

    renderQuestionAndResponseHere(responseObject) {
        let data = [], answer = '';
        const survey = this.props.survey;
        for (let [key, value] of Object.entries(responseObject)) {
            const questionObject = survey.questions[key];
            for(let m = 0; m < questionObject.options.length; m++) {
                const item = questionObject.options[m];
                if (item.key === value) {
                    answer = item.value;
                    break;
                }
            }
            data.push(<p className='co-ordinator-response'>{questionObject.question} : {answer}</p>)
        }
        return <div>
            {data}
        </div>
    }

}