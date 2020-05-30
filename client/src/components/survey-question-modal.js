import React, { Component } from 'react';
import CustomInput from '../custom-components/custom-input';
import CustomModal from '../custom-components/custom-modal';
import CustomError from '../custom-components/custom-error';
import { isNil, isEmpty } from 'lodash';

export default class SurveyQuestionModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {},
            numberOfOptions: 3
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.questionRef = React.createRef(); 
    }

    render() {
        const defaultQuestion = (this.props.selectionQuestionSection || {}).question;
        return <CustomModal
            title={'Set Question and Options'}
            showModal={this.props.showAddNewQuestionModal}
            actionButtonText={isNil(defaultQuestion) ? 'Add' : 'Update'}
            body={this.renderBody()}
            onCancel={this.props.onCancel}
            onClick={this.handleSubmit} />
    }

    renderBody() {
        return <div>
            {this.renderQuestion()}
            {this.renderOptions()}
        </div>
    }

    renderQuestion() {
        const { errorObject } = this.state;
        const defaultQuestion = (this.props.selectionQuestionSection || {}).question
        return <CustomInput
            label={"Question"}
            id={"question"}
            ref={this.questionRef}
            errorMessage={errorObject.questionError}
            mandatory={true}
            defaultValue={defaultQuestion}
            prependAddon='fa-question'
        />
    }

    renderOptions() {
        let optionsObject = [];
        const defaultOptions = (this.props.selectionQuestionSection || {}).options || [];
        for (let i = 0; i < this.state.numberOfOptions; i++) {
            const index = i + 1;
            optionsObject.push(
                <CustomInput
                    autoComplete="off"
                    key={'option-' + index}
                    label={"Option " + index}
                    id={"option" + index}
                    ref={"option" + index}
                    defaultValue={(defaultOptions[i] || {}).value}
                    prependAddon='fa-circle'
                />
            );
        }
        return <div>
            {optionsObject}
            <CustomError errorMessage={this.state.errorObject.optionsError} />
        </div>
    }

    handleSubmit() {
        const state = this.state;
        let errorObject = {};
        if (isEmpty(this.questionRef.current['reference'].current.value)) {
            errorObject.questionError = 'Survey Question cannot be empty';
        }
        const data = { options: [] };
        data.question = this.questionRef.current['reference'].current.value;
        for (let i = 0; i < this.state.numberOfOptions; i++) {
            const id = 'option' + (i + 1);
            const opt = this.refs[id]['reference'].current.value;
            if (!isNil(opt) && !isEmpty(opt)) {
                data.options.push({ key: 'option_' + i, value: opt });
            }
        }
        if (isEmpty(data.options)) {
            errorObject.optionsError = 'Atleast 1 option is required.';
        }
        state.errorObject = errorObject;
        this.setState(state, () => isEmpty(errorObject) ?
            isNil(this.props.selectionQuestionSection) ?
                this.props.addNewQuestion(data) : this.props.editQuestion(data)
            : null);
    }
}