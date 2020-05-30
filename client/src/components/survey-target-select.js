import React, { Component } from 'react';
import { Label, Card } from 'reactstrap';
import CustomDropDown from '../custom-components/custom-dropdown';
import Utility from '../utilities/utility';

export default class SurveyTargetSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                "gender": (props.targetModalData || {}).gender,
                "age_group": (props.targetModalData || {}).age_group
            },
            errorObject: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { errorObject } = this.state;
        const {targetModalData} = this.props;
        return <div >
            <Label className='input-label' style={{ marginTop: '8px' }}>{'Select Target Group'}</Label>
            <Card style={{ padding: '4px' }}>
                <CustomDropDown
                    label={"Gender"}
                    id={"gender"}
                    onChange={this.handleChange}
                    values={Utility.getTargetGenderOptions()}
                    errorMessage={errorObject.genderError}
                    defaultValueKey={targetModalData.gender}
                />
                <CustomDropDown
                    label={"Age Group"}
                    id={"age_group"}
                    onChange={this.handleChange}
                    values={Utility.getTargetAgeGroupOptions()}
                    errorMessage={errorObject.age_groupError}
                    defaultValueKey={targetModalData.age_group}
                />
            </Card>
        </div>
    }

    handleChange(key, value) {
        const state = this.state;
        state.data[key] = value;
        this.setState(state, () => this.props.updateTargetData(state.data));
    }
}