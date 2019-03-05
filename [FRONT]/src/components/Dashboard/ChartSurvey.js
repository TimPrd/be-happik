import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import client from '../../api';
import Theme from '../../utils/Theme';
import { Col } from 'react-flexbox-grid';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
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

        } catch (error) {
            toast.error('error' + error, {
                position: toast.POSITION.TOP_RIGHT,
            });
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
                    fontColor: Theme.colors.grey5c,
                    fontStyle: 'normal',
                    fontFamily: Theme.custom.font,
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

    componentDidMount = async () => {

        var analyticsSurvey = await this.fetchAnalytics();
        var analytics = analyticsSurvey["data"]["surveyAnalytics"];

        this.setState({ analytics: analytics });

        analytics.map((analytic, index) => (

            this.renderChart(analytic, index)

        ))

    }



    render() {

        var analytics = this.state.analytics;

        return (analytics.map((result, index) => (

            <Col xs={12} md={6} key={index} >
                <Container>
                    <Canvas id={"surveyChart" + index} key={index} />
                </Container>
            </Col>
        ))

        )

    }
}


export default ChartSurvey;
