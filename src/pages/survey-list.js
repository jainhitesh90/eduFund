import React, { Component } from 'react';
import { isNil } from 'lodash';
import { Redirect } from 'react-router';
import CustomButton from '../custom-components/custom-button';
import ApiHelper from '../utilities/api-helper';
import { Row, Col } from 'reactstrap';

export default class SurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: []
        }
        this.getSurveyList = this.getSurveyList.bind(this);
        this.onAddNewSurveyClick = this.onAddNewSurveyClick.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getMySurveys');
        console.log('ressss', res);
        if (!isNil(res.data.surveys)) {
            this.setState({
                surveys: res.data.surveys,
                error: null
            })
        } else {
            this.setState({
                surveys: [],
                error: res.data.error
            })
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/create-survey' />
        }
        return (
            <div style={{ background: 'lightgray', padding: '24px' }}>
                {this.renderAddSurveyButton()}
                <p style={{ color: 'blue', paddingTop: '24px' }}>My Survey List here!!</p>
                {!isNil(this.state.error) ? <p style={{ color: 'red' }}>Error : {this.state.error}</p> : null}
                {this.renderSurveyList()}
            </div>
        )
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
            redirect: true
        });
    }

    renderSurveyList() {
        const self = this;
        return this.state.surveys.map(function (item, index) {
            console.log('item', item);
            return <Row key={'survey-' + index}>
                <Col xs={4}>
                    <p>{item.title}</p>
                </Col>
                <Col xs={4}>
                    {item.isPublished ? <p style={{color: 'blue'}}>Already Published</p> : <CustomButton
                        label={"Publish Survey"}
                        id={"publishSurvey"}
                        onClick={() => self.publishSurvey(item._id)}
                        color={"primary"}
                    />}
                </Col>
            </Row>
        })
    }

    publishSurvey = async (id) => {
        console.log('Publishing survey with id', id);
        const res = await ApiHelper.postData('/survey/update/' + id, {isPublished: true});
        console.log('ressss', res);
        this.getSurveyList();
        alert('Survey updated successfully')
        // if (!isNil(res.data.surveys)) {
        //     this.setState({
        //         surveys: res.data.surveys,
        //         error: null
        //     })
        // } else {
        //     this.setState({
        //         surveys: [],
        //         error: res.data.error
        //     })
        // }
    }
}