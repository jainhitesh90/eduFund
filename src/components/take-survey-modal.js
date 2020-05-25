import React, { Component } from 'react';
import CustomModal from '../custom-components/custom-modal';
import CustomRadioGroup from '../custom-components/custom-radio-group';
import ApiHelper from '../utilities/api-helper';
import {isNil} from 'lodash';

export default class TakeSurveyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {},
            errorObject: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitSurvey = this.submitSurvey.bind(this);
    }

    render() {
        console.log('survey', this.props.survey);
        const { survey } = this.props;
        return <CustomModal
            title={survey.title}
            showModal={this.props.showModal}
            actionButtonText={'Submit'}
            body={this.renderBody()}
            onCancel={this.props.onCancel}
            onClick={this.handleSubmit}
        />
    }

    renderBody() {
        const self = this;
        const { survey } = this.props;
        const questions = survey.questions || [];
        return <div>
            {
                questions.map(function (item, index) {
                    return self.renderSingleQuestionSection(item, index);
                })
            }
        </div>
    }

    renderSingleQuestionSection(data, index) {
        const options = data.options || [];
        const questionNumber = index + 1;
        return (
            <CustomRadioGroup
                label={questionNumber + ') ' + data.question}
                id={index}
                onChange={this.handleChange}
                values={options}
            // errorMessage={errorObject.genderError}
            />
        );
    }

    handleChange(key, value) {
        const state = this.state;
        state.response[key] = value;
        this.setState(state);
    }

    handleSubmit() {
        const state = this.state;
        console.log('data', state.response);
        if (this.validateData(state.response)) {
            this.submitSurvey();
        }
        // state.data.targetAgeGroup = state.data.ageGroup;
        // state.data.targetGender = state.data.gender;
        // state.errorMessage = null; //refresh this on every check
        // this.setState(state, this.validateData);
    }

    validateData(data) {
        return true;
        // api call
        // this.props.onSubmit();
    }

    submitSurvey = async () => {
        let payload = {};
        payload.surveyId = this.props.survey._id;
        payload.response = this.state.response;
        console.log('payload', payload);
        if (isNil(this.state.errorMessage)) {
            const res = await ApiHelper.postData('/user/submitSurvey', payload);
            if (!isNil(res.error)) {
                console.log('failed submitting survey', res.error);
                this.setState({
                    errorMessage: res.error
                })
            } else {
                console.log('survey submitted successfully', res.data);
                this.props.onSubmit();
            }
        }
    }
}
