import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import { Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import CustomButton from '../custom-components/custom-button';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import SurveyTargetModal from '../components/survey-target-modal';
import SurveyQuestionModal from '../components/survey-question-modal';
import ApiHelper from '../utilities/api-helper';

export default class CreateSurvey extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {},
            targetModalData: {},
            showTargetModal: false,
            showAddNewQuestionModal: false,
            questions: []
        }
        this.createSurvey = this.createSurvey.bind(this);
        this.updateTargetGroupData = this.updateTargetGroupData.bind(this);
    }

    render() {
        //TODO need to check this way of routing again.
        if (this.state.redirectToHome === true) {
            return <Redirect to='/my-surveys' />
        }
        return (
            <div>
                <p>Create Survey here!!</p>
                {this.renderSurveyForm()}
                {this.renderTargetModal()}
                {this.renderAddNewQuestionModal()}
            </div>
        )
    }

    renderSurveyForm() {
        const { errorObject, errorMessage } = this.state;
        console.log('state', this.state);
        return (
            <div style={{ padding: '16px', background: 'lightgrey' }}>
                <Row>
                    <Col xs={6} className={'offset-3'}>
                        <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
                            <CustomInput
                                label={"Survey Title"}
                                id={"title"}
                                ref={"title"}
                                errorMessage={errorObject.titleError}
                            />
                            {this.renderQuestionsSection()}
                            {this.renderTargetGroupSection()}
                            <CustomButton
                                label={"Submit"}
                                id={"submit"}
                                onClick={this.createSurvey}
                                color={"primary"}
                            />
                            <CustomError errorMessage={errorMessage} />
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }

    renderQuestionsSection() {
        const self = this, { questions } = this.state;
        return <div>
            {questions.length > 0 ? <p style={{ marginTop: '20px', color: 'red' }}>Questions</p> : null}
            {this.state.questions.map(function (item, index) {
                return self.renderSingleQuestionSection(item, index + 1)
            })}
            <CustomButton
                label={"Add New Question"}
                id={"addNewQuestion"}
                onClick={() => this.setState({ showAddNewQuestionModal: !this.state.showAddNewQuestionModal })}
                color={"primary"}
            />
        </div>
    }

    renderSingleQuestionSection(item, questionNumber) {
        return <div>
            <p>Q{questionNumber}) {item.question}</p>
            {item.options.map(function (option, optionIndex) {
                return isNil(option) || isEmpty(option) ? null : <p>{String.fromCharCode(97 + optionIndex)}) {option}</p>
            })}
        </div>
    }

    renderTargetGroupSection() {
        const { targetModalData } = this.state;
        const label = !isNil(targetModalData.ageGroup) || !isNil(targetModalData.gender) ? 'Update Target Group' : 'Select Target Group';
        return <div>
            {!isNil(targetModalData.ageGroup) ? <p>Target Age Group : {targetModalData.ageGroup}</p> : null}
            {!isNil(targetModalData.gender) ? <p>Target Gender : {targetModalData.gender}</p> : null}
            <CustomButton
                label={label}
                id={"selectTargetGroup"}
                onClick={() => this.setState({ showTargetModal: !this.state.showTargetModal })}
                color={"primary"}
            />
        </div>
    }

    renderTargetModal() {
        return <SurveyTargetModal
            showTargetModal={this.state.showTargetModal}
            updateTargetData={(data) => this.updateTargetGroupData(data)}
        />;
    }

    renderAddNewQuestionModal() {
        return <SurveyQuestionModal
            showAddNewQuestionModal={this.state.showAddNewQuestionModal}
            updateQuestionsData={(data) => this.updateQuestionsData(data)}
        />;
    }

    updateTargetGroupData(data) {
        console.log('updateTargetGroupData', data);
        const state = this.state;
        if (data != null) {
            state.targetModalData = data;
        }
        state.showTargetModal = !state.showTargetModal;
        this.setState(state);
    }

    updateQuestionsData(data) {
        console.log('updateTargetGroupData', data);
        const state = this.state;
        if (data != null) {
            state.questions.push(data);
        }
        state.showAddNewQuestionModal = !state.showAddNewQuestionModal;
        this.setState(state);
    }

    createSurvey = async () => {
        console.log('state', this.state);
        let payload = {};
        payload.title = this.refs.title['reference'].current.value;
        payload.questions = this.state.questions;
        payload.targetGroup = this.state.targetModalData;
        if (isNil(this.state.errorMessage)) {
            const res = await ApiHelper.postData('/survey/add', payload);
            if (!isNil(res.error)) {
                console.log('failed adding survey question', res.error);
                this.setState({
                    errorMessage: res.error
                })
            } else {
                console.log('survey added successfully', res.data);
                this.setState({
                    redirectToHome: true
                })
            }
        }
    }
}