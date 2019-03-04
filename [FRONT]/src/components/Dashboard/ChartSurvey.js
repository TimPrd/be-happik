import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import client from '../../api';
import Theme from '../../utils/Theme';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { isEmptyChildren } from 'formik';
import PropTypes from 'prop-types';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;





class ChartSurvey extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        analytics: [],
    };



    fetchAnalytics = async () => {
        const { match } = this.props;
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        try {
            let analyticsSurvey = await client.get(`/api/analytic/survey/response`, {
                headers: {
                    Authorization: `Bearer ${loggedUser.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return analyticsSurvey;

        } catch (err) {
            return null;
        }
    };

    renderChart(analytic, index) {

        var ctx = document.getElementById("surveyChart" + index)

        return new Chart(ctx, {

            type: 'pie',
            data: {
                datasets: [{

                    data: [analytic['answers'], analytic['total']],
                    backgroundColor: [Theme.colors.bluefe, Theme.colors.rose85,]
                }],

                labels: [
                    'Answered',
                    'Waiting'
                ]
            },
            options: {
                responsive: true,
                animation: {
                    animateRotate: true,
                    animateScale: true
                },
                title: {
                    display: true,
                    text: analytic['info']['title'],
                    fontSize: Theme.custom.subtitle,
                    fontStyle: 'normal',
                    position: 'top',
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                },

            },
        })


    }

    componentDidUpdate = async () => {
        var analytics = this.state.analytics;

        analytics.map((analytic, index) => (

            this.renderChart(analytic, index)

        ))
    }
    componentDidMount = async () => {

        var analyticsSurvey = await this.fetchAnalytics();
        var analytics = analyticsSurvey["data"]["surveyAnalytics"];

        this.setState({ analytics: analytics });

    }



    render() {

        var analytics = this.state.analytics;

        return (analytics.map((result, index) => (

            <Col xs={4} key={index} >
                <Canvas id={"surveyChart" + index} key={index} />
            </Col>
        ))

        )

    }
}


export default ChartSurvey;
