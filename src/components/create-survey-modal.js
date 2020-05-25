import React, { Component } from 'react';
import { isNil, isEmpty, startCase } from 'lodash';
import { Row, Col, Label, Card } from 'reactstrap';
import CustomButton from '../custom-components/custom-button';
import CustomModal from '../custom-components/custom-modal';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import SurveyTargetModal from './survey-target-modal';
import SurveyQuestionModal from './survey-question-modal';
import ApiHelper from '../utilities/api-helper';

export default class CreateSurveyModal extends Component {
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
        return (
            this.renderModal()
        )
    }

    renderModal() {
        return <CustomModal
            title={'Create New Survey'}
            showModal={this.props.showCreateSurveyModal}
            actionButtonText={'Add'}
            body={this.renderModalBody()} />
    }

    renderModalBody() {
        return (
            <div>
                {this.renderSurveyForm()}
                {this.renderTargetModal()}
                {this.renderAddNewQuestionModal()}
            </div>
        )
    }

    renderSurveyForm() {
        const { errorObject, errorMessage } = this.state;
        return (
            <div style={{ padding: '16px', background: 'lightgrey' }}>
                <Row>
                    <Col xs={6} className={'offset-3'}>
                        <form style={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
                            <CustomInput
                                label={"Survey Title"}
                                id={"title"}
                                ref={"title"}
                                mandatory={true}
                                prependAddon='fa-info'
                                errorMessage={errorObject.titleError}
                            />
                            {this.renderQuestionsSection()}
                            {this.renderTargetGroupSection()}
                            <CustomButton
                                label={"Submit"}
                                id={"submit"}
                                onClick={this.createSurvey}
                                color={"primary"}
                                style={{ margin: '48px auto auto', width: '240px' }}
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
            <span>
                <Label
                    style={{ marginTop: '10px', marginBottom: 0 }}>
                    {'Questions'} {<sup style={{ color: 'red' }}>*</sup>}
                </Label>
                <Label
                    style={{ marginLeft: '16px', color: 'blue', cursor: 'pointer' }}
                    onClick={() => this.setState({ showAddNewQuestionModal: !this.state.showAddNewQuestionModal })}>
                    Add New Question
                    </Label>
            </span>
            {questions.map(function (item, index) {
                return self.renderSingleQuestionSection(item, index + 1)
            })}
        </div>
    }

    renderSingleQuestionSection(item, questionNumber) {
        return <Card style={{ padding: '8px' }}>
            <p>Q{questionNumber}) {item.question}</p>
            {item.options.map(function (option, optionIndex) {
                return isNil(option) || isEmpty(option) ? null : <Label style={{ margin: 0 }}>{String.fromCharCode(97 + optionIndex)}) {option.value}</Label>
            })}
        </Card>
    }

    renderTargetGroupSection() {
        const { ageGroup, gender } = this.state.targetModalData
        const label = !isNil(ageGroup) || !isNil(gender) ? 'Update' : 'Select';
        return <div>
            <span>
                <Label
                    style={{ marginTop: '10px', marginBottom: 0 }}>
                    {'Target Group'}
                </Label>
                <Label
                    style={{ marginLeft: '16px', color: 'blue', cursor: 'pointer' }}
                    onClick={() => this.setState({ showTargetModal: !this.state.showTargetModal })}>
                    {label}
                </Label>
            </span>
            {
                isNil(ageGroup) && isNil(gender) ? null :
                    <Card style={{ padding: '8px' }}>
                        {!isNil(ageGroup) ? <p>Age Group : {startCase(ageGroup)}</p> : null}
                        {!isNil(gender) ? <p>Gender : {startCase(gender)}</p> : null}
                    </Card>
            }
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
        const state = this.state;
        if (data != null) {
            state.questions.push(data);
        }
        state.showAddNewQuestionModal = !state.showAddNewQuestionModal;
        this.setState(state);
    }

    createSurvey = async () => {
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
                this.props.onCreateSurveySuccessfully();
            }
        }
    }
}