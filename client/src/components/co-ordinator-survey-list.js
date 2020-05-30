import React, { Component } from 'react';
import { Row, Col, Label } from 'reactstrap';
import { isNil, isEmpty } from 'lodash';
import CustomButton from '../custom-components/custom-button';
import CreateSurveyModal from '../components/create-survey-modal';
import ViewSurveyModal from '../components/view-survey-modal';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import CustomError from '../custom-components/custom-error';

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
        this.onCancelCreateSurvey = this.onCancelCreateSurvey.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    render() {
        return (
            <div>
                {this.renderCreateSurveyModal()}
                {this.renderViewSurveyModal()}
                <div className='survey-list-container'>
                    <CustomError errorMessage={this.state.error} />
                    {this.renderSurveyList()}
                </div>
            </div>
        )
    }

    renderCreateSurveyModal() {
        if (this.state.showCreateSurveyModal) {
            return <CreateSurveyModal
                survey={this.state.selectedSurvey}
                showCreateSurveyModal={this.state.showCreateSurveyModal}
                onCancelCreateSurvey={this.onCancelCreateSurvey}
                onCreateSurveySuccessfully={this.onCreateSurveySuccessfully}
            />
        }
    }

    renderViewSurveyModal() {
        console.log('rendering renderViewSurveyModal', this.state.showViewSurveyModal);
        if (this.state.showViewSurveyModal) {
            return <ViewSurveyModal
                survey={this.state.selectedSurvey}
                showModal={this.state.showViewSurveyModal}
                onCancel={() => this.setState({
                    showViewSurveyModal: false,
                    selectedSurvey: null
                })}
            />
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
            showCreateSurveyModal: false,
            showSpinner: true,
            selectedSurvey: null
        });
        this.getSurveyList();
    }

    onCancelCreateSurvey() {
        this.setState({
            showCreateSurveyModal: false,
            selectedSurvey: null
        });
    }

    renderSurveyList() {
        const self = this;
        const { surveys } = this.state;
        if (this.state.showSpinner) {
            return <SpinnerComponent />
        } else return <div >
            <div className='survey-list-header-section'>
                <Label className='header'>My Surveys!!</Label>
                {this.renderAddSurveyButton()}
            </div>
            {
                isEmpty(surveys) ? <CustomError errorMessage={'No Surveys added by you till now.'} /> :
                    <div className='survey-list-table'>
                        {
                            surveys.map(function (item, index) {
                                return <div className='survey-item' key={'survey-' + index}>
                                    <Row className='survey-item'>
                                        <Col xs={6} sm={6}>
                                            <Label className='survey-item-title'>{index + 1 + ') ' + item.title}</Label>
                                        </Col>
                                        <Col xs={2} sm={2} className='align-center-horizontally'>
                                            {item.is_published ?
                                                <Label className='survey-item-info'> Published </Label> :
                                                <Label onClick={() => self.publishSurvey(item._id)} className='survey-item-action'>Publish
                                    </Label>}
                                        </Col>
                                        <Col xs={2} sm={2} className='align-center-horizontally'>
                                            {!item.is_published ?
                                                <Label onClick={() => self.editSurvey(item)} className='survey-item-action'>Edit
                                    </Label> : null}
                                        </Col>
                                        <Col xs={2} sm={2} className='align-center-horizontally'>
                                            <Label onClick={() => self.viewSurvey(item)} className='survey-item-action'>View</Label>
                                        </Col>
                                    </Row>
                                </div>
                            })
                        }
                    </div>
            }
        </div>

    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getCoOrindtorSurveys');
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
        await ApiHelper.postData('/survey/update/' + id, { is_published: true });
        this.getSurveyList();
    }

    editSurvey = async (survey) => {
        this.setState({
            selectedSurvey: survey,
            showCreateSurveyModal: true
        })
    }

    viewSurvey = async (survey) => {
        console.log('viewSurvey', survey);
        this.setState({
            selectedSurvey: survey,
            showViewSurveyModal: true
        })
    }
}