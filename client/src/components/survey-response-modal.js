import React, { Component } from 'react';
import CustomModal from '../custom-components/custom-modal';
import { Label } from 'reactstrap';

export default class SurveyResponseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { survey, onClick } = this.props;
        return <CustomModal
            title={survey.title}
            showModal={this.props.showModal}
            actionButtonText={'Close'}
            body={this.renderBody()}
            onClick={onClick}
        />
    }

    renderBody() {
        const self = this;
        const { survey } = this.props;
        const questions = survey.questions || [];
        const response = survey.userSurveyResponse || {};
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
        for(let m = 0; m < data.options.length; m++) {
            const item = data.options[m];
            if (item.key === answerIndex) {
                answer = item.value;
                break;
            }
        }
        return (
            <div>
                <Label className='survey-response-modal-question'>{questionNumber})  {data.question}</Label>
                <Label className='survey-response-modal-answer'>... {answer}</Label>
            </div>
        );
    }
}
