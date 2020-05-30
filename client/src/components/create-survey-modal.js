import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import { Row, Col, Label, Card } from 'reactstrap';
import CustomModal from '../custom-components/custom-modal';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import SurveyTargetSelect from './survey-target-select';
import SurveyQuestionModal from './survey-question-modal';
import ApiHelper from '../utilities/api-helper';

export default class CreateSurveyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {},
            targetModalData: !isNil(props.survey) ? props.survey.target_group || {} : {},
            showTargetModal: false,
            showAddNewQuestionModal: false,
            questions: !isNil(props.survey) ? props.survey.questions || [] : [],
        }
        this.createSurvey = this.createSurvey.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTargetData = this.updateTargetData.bind(this);
        this.titleRef = React.createRef();
    }

    render() {
        const { survey, showCreateSurveyModal, onCancelCreateSurvey } = this.props;
        return <CustomModal
            title={isNil(survey) ? 'Create New Survey' : 'Edit Survey'}
            showModal={showCreateSurveyModal}
            actionButtonText={isNil(survey) ? 'Submit' : 'Update'}
            onClick={this.handleSubmit}
            onCancel={onCancelCreateSurvey}
            body={this.renderModalBody()} />
    }

    renderModalBody() {
        return (
            <div>
                {this.renderSurveyForm()}
                {this.renderAddNewQuestionModal()}
            </div>
        )
    }

    renderSurveyForm() {
        const { errorObject, errorMessage, targetModalData } = this.state;
        const defaultTitle = (this.props.survey || {}).title
        return (
            <div style={{ padding: '16px', background: 'lightgrey' }}>
                <Row>
                <Col xs={12} sm={6} className={'offset-sm-3 offset-0'}>
                        <form noValidate autoComplete="off">
                            <CustomInput
                                label={"Survey Title"}
                                id={"title"}
                                ref={this.titleRef}
                                mandatory={true}
                                prependAddon='fa-info'
                                defaultValue={defaultTitle}
                                errorMessage={errorObject.titleError}
                            />
                            <SurveyTargetSelect
                                updateTargetData={(data) => this.updateTargetData(data)}
                                targetModalData={targetModalData}
                            />
                            {this.renderQuestionsSection()}
                            <CustomError errorMessage={errorMessage} />
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }

    updateTargetData(data) {
        const state = this.state;
        if (data != null) {
            state.targetModalData = data;
        }
        this.setState(state);
    }

    renderQuestionsSection() {
        const self = this, { questions, errorObject } = this.state;
        return <div>
            <span>
                <Label className='input-label' style={{ marginTop: '12px' }}>{'Survey questions'}<sup style={{ color: 'red' }}>*</sup></Label>
                <i class={'fa fa-plus add-survey-question'} onClick={() => this.setState({ showAddNewQuestionModal: !this.state.showAddNewQuestionModal })}></i>
            </span>
            {questions.map(function (item, index) {
                return self.renderSingleQuestionSection(item, index)
            })}
            <div>
                <CustomError errorMessage={errorObject.questionsError} />
            </div>
        </div>
    }

    renderSingleQuestionSection(item, index) {
        return <Card style={{ padding: '8px' }}>
            <div className='edit-survey-question-section'>
                <Label className='survey-question'>{index + 1}) {item.question}</Label>
                <i class={'fa fa-edit add-survey-question'} onClick={() => this.setState({
                    showAddNewQuestionModal: !this.state.showAddNewQuestionModal,
                    selectionQuestionSection: item,
                    selectionQuestionIndex: index
                })}></i>
            </div>
            {item.options.map(function (option, optionIndex) {
                return isNil(option) || isEmpty(option) ? null : <Label className='survey-answer-option'>{String.fromCharCode(97 + optionIndex)}) {option.value}</Label>
            })}
        </Card>
    }

    renderAddNewQuestionModal() {
        return <SurveyQuestionModal
            showAddNewQuestionModal={this.state.showAddNewQuestionModal}
            addNewQuestion={(data) => this.addNewQuestion(data)}
            editQuestion={(data) => this.editQuestion(data)}
            selectionQuestionSection={this.state.selectionQuestionSection}
            onCancel={() => this.setState({
                showAddNewQuestionModal: false
            })}
        />;
    }

    addNewQuestion(data) {
        const state = this.state;
        if (data != null) {
            state.questions.push(data);
        }
        state.showAddNewQuestionModal = !state.showAddNewQuestionModal;
        this.setState(state);
    }

    editQuestion(data) {
        const state = this.state;
        if (data != null) {
            state.questions[this.state.selectionQuestionIndex] = data;
        }
        state.showAddNewQuestionModal = !state.showAddNewQuestionModal;
        this.setState(state);
    }

    handleSubmit() {
        const state = this.state;
        const errorObject = this.validateInputs();
        if (isEmpty(errorObject)) {
            let payload = {};
            payload.title = this.titleRef.current['reference'].current.value;
            payload.questions = this.state.questions;
            payload.target_group = this.state.targetModalData;
            const surveyId = (this.props.survey || {})._id;
            this.createSurvey(payload, surveyId);
        } else {
            state.errorObject = errorObject;
            this.setState(state);
        }
    }

    validateInputs() {
        const state = this.state;
        let errorObject = {};
        if (isEmpty(this.titleRef.current['reference'].current.value)) {
            errorObject.titleError = 'Survey title cannot be empty';
        }
        if (isEmpty(state.questions)) {
            errorObject.questionsError = 'Add atleast 1 question';
        }
        return errorObject;
    }

    createSurvey = async (payload, id) => {
        const route = isNil(id) ? '/survey/add' : ('/survey/update/' + id);
        const res = await ApiHelper.postData(route, payload);
        if (!isNil(res.error)) {
            this.setState({
                errorMessage: res.error
            })
        } else {
            this.props.onCreateSurveySuccessfully();
        }
    }
}