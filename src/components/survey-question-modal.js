import React, { Component } from 'react';
import CustomInput from '../custom-components/custom-input';
import CustomModal from '../custom-components/custom-modal';
import { isNil, isEmpty } from 'lodash';

export default class SurveyQuestionModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {},
            numberOfOptions: 4
        }
        this.updateData = this.updateData.bind(this);
    }

    render() {
        return (
            this.renderModal()
        )
    }

    renderModal() {
        return <CustomModal
            title={'Set Question and Options'}
            showModal={this.props.showAddNewQuestionModal}
            actionButtonText={'Add'}
            body={this.renderModalBody()}
            onCancel={() => this.updateData(false)}
            onClick={() => this.updateData(true)} />
    }

    renderModalBody() {
        const { errorObject } = this.state;
        let optionsObject = [];
        for (let i = 0; i < this.state.numberOfOptions; i++) {
            const index = i + 1;
            optionsObject.push(
                <CustomInput
                    key={'option-' + index}
                    label={"Option " + index}
                    id={"option" + index}
                    ref={"option" + index}
                    mandatory={true}
                    prependAddon='fa-circle'
                />
            );
        }
        return <div>
            <CustomInput
                label={"Question"}
                id={"question"}
                ref={"question"}
                errorMessage={errorObject.questionError}
                mandatory={true}
                prependAddon='fa-question'
            />
            {optionsObject}
        </div>
    }

    updateData(proceed) {
        if (proceed) {
            const data = { options: [] };
            data.question = this.refs.question['reference'].current.value;
            for (let i = 0; i < this.state.numberOfOptions; i++) {
                const id = 'option' + (i + 1);
                const opt = this.refs[id]['reference'].current.value;
                if (!isNil(opt) && !isEmpty(opt)) {
                    data.options.push(opt);
                }
            }
            this.props.updateQuestionsData(data);
        } else {
            this.props.updateQuestionsData(null);
        }
    }
}