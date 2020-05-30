import React, { Component } from 'react';
import CustomModal from '../custom-components/custom-modal';
import CustomDropDown from '../custom-components/custom-dropdown';
import ApiHelper from '../utilities/api-helper';
import { isNil, isEmpty } from 'lodash';

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
        const { errorObject } = this.state;
        let options = data.options || [];
        options = [{ key: null, value: 'Select' }].concat(options);
        const questionNumber = index + 1;
        return (
            <CustomDropDown
                label={questionNumber + ') ' + data.question}
                mandatory={true}
                id={index}
                ref={"option" + index}
                onChange={this.handleChange}
                values={options}
                errorOutline={!isNil(errorObject[index])}
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
        const errorObject = {};
        const questions = this.props.survey.questions || [];
        for (let m = 0; m < questions.length; m++) {
            if (isNil(state.response[m])) {
                errorObject[m] = 'Select atleast one option.';
            }
        }
        this.setState({
            errorObject: errorObject
        }, () => isEmpty(errorObject) ? this.submitSurvey() : null )
    }

    submitSurvey = async () => {
        let payload = {};
        payload.surveyId = this.props.survey._id;
        payload.response = this.state.response;
        const res = await ApiHelper.postData('/survey/submitSurvey', payload);
        if (!isNil(res.error)) {
            this.setState({
                errorMessage: res.error
            })
        } else {
            this.props.onSubmit();
        }
    }
}
