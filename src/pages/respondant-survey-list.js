import React, { Component } from 'react';
import { isNil } from 'lodash';
import ApiHelper from '../utilities/api-helper';
import { Row, Col } from 'reactstrap';

export default class RespondantSurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: []
        }
        this.getSurveyList = this.getSurveyList.bind(this);
    }

    componentWillMount() {
        this.getSurveyList();
    }

    getSurveyList = async () => {
        const res = await ApiHelper.getData('/survey/getRespondantSurveys');
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
        return (
            <div style={{ background: 'lightgray', padding: '24px' }}>
                <p style={{ color: 'blue', paddingTop: '24px' }}>My Survey List here!!</p>
                {!isNil(this.state.error) ? <p style={{ color: 'red' }}>Error : {this.state.error}</p> : null}
                {this.renderSurveyList()}
            </div>
        )
    }

    renderSurveyList() {
        return this.state.surveys.map(function (item, index) {
            return <Row key={'survey-' + index}>
                <Col xs={4}>
                    <p>{item.title}</p>
                </Col>
                <Col xs={4}>
                {item.isPublished ? <p style={{color: 'blue'}}>Published</p> : <p style={{color: 'grey'}}>Not Published</p>}
                </Col>
            </Row>
        })
    }
}