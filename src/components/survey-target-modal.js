import React, { Component } from 'react';
import CustomRadioGroup from '../custom-components/custom-radio-group';
import CustomModal from '../custom-components/custom-modal';
import CustomDropDown from '../custom-components/custom-dropdown';
import Constant from '../utilities/constant';

export default class SurveyTargetModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateTargetGroupData = this.updateTargetGroupData.bind(this);
    }

    render() {
        return (
            this.renderTargetModal()
        )
    }

    renderTargetModal() {
        return <CustomModal
            title={'Select Target group'}
            showModal={this.props.showTargetModal}
            actionButtonText={'Proceed'}
            body={this.renderTargetModalBody()}
            onCancel={() => this.props.updateTargetData(null)}
            onClick={(data) => this.updateTargetGroupData(data)} />
    }

    renderTargetModalBody() {
        const { errorObject } = this.state;
        return <div>
            <CustomRadioGroup
                label={"Target Gender"}
                id={"gender"}
                onChange={this.handleChange}
                values={Constant.targetGender}
                errorMessage={errorObject.genderError}
            />
            <CustomDropDown
                label={"Target Age Group"}
                id={"ageGroup"}
                onChange={this.handleChange}
                values={Constant.targetAgeGroup}
                errorMessage={errorObject.ageGroupError}
            />
        </div>
    }

    handleChange(key, value) {
        const state = this.state;
        state.data[key] = value;
        this.setState(state);
    }

    updateTargetGroupData(data) {
        console.log('updateTargetGroupData', this.state.data);
        this.props.updateTargetData(this.state.data);
    }

    handleSubmit() {
        const state = this.state;
        state.data.targetAgeGroup = state.data.ageGroup;
        state.data.targetGender = state.data.gender;
        state.errorMessage = null; //refresh this on every check
        this.setState(state, this.validateData);
    }
}