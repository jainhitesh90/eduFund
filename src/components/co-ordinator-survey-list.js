import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { isNil, isEmpty } from 'lodash';
import CustomButton from '../custom-components/custom-button';
import CreateSurveyModal from '../components/create-survey-modal';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';

export default class CoorindatorSurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: [],
            showSpinner: true
        }
        this.getSurveyList = this.getSurveyList.bind(this);
        this.onAddNewSurveyClick = this.onAddNewSurveyClick.bind(this);
        this.onCreateSurveySuccessfully = this.onCreateSurveySuccessfully.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    render() {
        return (
            <div>
                {this.renderCreateSurveyModal()}
                <div style={{ background: 'lightgray', padding: '24px' }}>
                    {this.renderAddSurveyButton()}
                    {!isNil(this.state.error) ? <p style={{ color: 'red' }}>Error : {this.state.error}</p> : null}
                    {this.renderSurveyList()}
                </div>
            </div>
        )
    }

    renderCreateSurveyModal() {
        console.log('inside renderCreateSurveyModal');
        if (this.state.showCreateSurveyModal) {
            return <CreateSurveyModal
                showCreateSurveyModal={this.state.showCreateSurveyModal}
                onCancelCreateSurvey={() => this.setState({ showCreateSurveyModal: false })}
                onCreateSurveySuccessfully={this.onCreateSurveySuccessfully} />
        }
    }

    renderAddSurveyButton() {
        return <CustomButton
            label={"Add New Survey"}
            id={"addSurvey"}
            onClick={this.onAddNewSurveyClick}
            color={"primary"}
        />
    }

    onAddNewSurveyClick() {
        this.setState({
            showCreateSurveyModal: true
        });
    }

    onCreateSurveySuccessfully() {
        this.setState({
            showCreateSurveyModal: false
        });
        this.getSurveyList();
    }

    renderSurveyList() {
        const self = this;
        const { surveys } = this.state;
        if (this.state.showSpinner) {
            return <SpinnerComponent />
        } else if (isEmpty(surveys)) {
            return <p style={{ color: 'red', paddingTop: '24px' }}>No Surveys added till now</p>
        } else return <div>
            <p style={{ color: 'blue', paddingTop: '24px' }}>Cordinator Survey List here!!</p>
            {
                surveys.map(function (item, index) {
                    console.log('item', item);
                    return <Row key={'survey-' + index}>
                        <Col xs={4}>
                            <p>{item.title}</p>
                        </Col>
                        <Col xs={4}>
                            {item.isPublished ? <p style={{ color: 'blue' }}>Published</p> : <CustomButton
                                label={"Publish Survey"}
                                id={"publishSurvey"}
                                onClick={() => self.publishSurvey(item._id)}
                                color={"primary"}
                            />}
                        </Col>
                    </Row>
                })
            }
        </div>

    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getCoOrindtorSurveys');
        console.log('ressss', res);
        if (!isNil(res.data.surveys)) {
            this.setState({
                surveys: res.data.surveys,
                error: null,
                showSpinner: false
            })
        } else {
            this.setState({
                surveys: [],
                error: res.data.error,
                showSpinner: false
            })
        }
    }

    publishSurvey = async (id) => {
        console.log('Publishing survey with id', id);
        const res = await ApiHelper.postData('/survey/update/' + id, { isPublished: true });
        console.log('ressss', res);
        this.getSurveyList();
        alert('Survey updated successfully')
    }
}