import React, { Component } from 'react';
import CustomModal from '../custom-components/custom-modal';
import CustomRadioGroup from '../custom-components/custom-radio-group';
import ApiHelper from '../utilities/api-helper';
import { isNil } from 'lodash';
import { Redirect } from 'react-router';

export default class SurveyResponseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to='/respondant/home' />
        }
        return (
            this.renderModal()
        )
    }

    renderModal() {
        console.log('survey', this.props.survey);
        const { survey, onClick } = this.props;
        return <CustomModal
            title={survey.title}
            showModal={this.props.showModal}
            actionButtonText={'Ok'}
            body={this.renderBody()}
            onClick={onClick}
        />
    }

    renderBody() {
        const self = this;
        const { survey } = this.props;
        const questions = survey.questions || [];
        const response = this.props.survey.userSurveyResponse || {};
        return <div>
            {
                questions.map(function (item, index) {
                    return self.renderSingleQuestionSection(item, index, response[index]);
                })
            }
        </div>
    }

    renderSingleQuestionSection(data, index, answerIndex) {
        const questionNumber = index + 1;
        let answer = null;
        data.options.map(function(item) {
            if (item.key === answerIndex) {
                answer = item.value;
            }
        })
        return (
            <div>
                <p>{questionNumber + ') ' + data.question}</p>
                <p>{answer}</p>
            </div>
        );
    }
}
