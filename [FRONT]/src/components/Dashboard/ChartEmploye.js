import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import client from '../../api';

import Theme from '../../utils/Theme';


const Canvas = styled.canvas`
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 20px;

  box-sizing: border-box;
`;

class ChartEmploye extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    
  }

  state = {
    analytic: [],
    status: null
  };

  fetchAnalytics = async () => {

    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      let analyticsMood = await client.get(`/api/analytic/mood`, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      return analyticsMood;

    } catch (error) {
      this.setState({ status: false })
    }
  };

  renderChart(analytic, ctx) {
    

    console.log(analytic)


    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Très insatisfait', 'Insatisfait', 'Indifférent', 'Satisfait', 'Très satisfait'],
        datasets: [
          {
            label: 'Très Insatisfait',
            data: [analytic[0], 0, 0, 0, 0],
            backgroundColor: Theme.colors.orange73,
          },
          {
            label: 'Insatisfait',
            data: [0, analytic[25], 0, 0, 0],
            backgroundColor: Theme.colors.bluefe,
          },
          {
            label: 'Indifférent',
            data: [0, 0, analytic[50], 0, 0],
            backgroundColor: Theme.colors.greybe,
          },
          {
            label: 'Satisfait',
            data: [0, 0, 0, analytic[75], 0],
            backgroundColor: '#FAEBCC',
          },
          {
            label: 'Très satisfait',
            data: [0, 0, 0, 0, analytic[100]],
            backgroundColor: Theme.colors.rose85
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        title: {
          display: true,
          text: ['Satisfaction de vos collaborateurs sur 7 jours'],
          fontSize: Theme.custom.subtitle,
          fontColor: Theme.colors.grey5c,
          fontStyle: 'normal',
          fontFamily: Theme.custom.font,
          position: 'top',
          padding: 20
        },
        scales: {
          xAxes: [{
            stacked: true,
            maxBarThickness: 50,
            gridLines: {
              display: true,
              drawBorder: false,
            },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              max: 140,
            },
            gridLines: {
              drawBorder: false,
            },
          }],
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        legend: {
          display: false,
        },
      },
    });


    
  }

  componentDidMount() {
    var mock = [
      {
        "data" : {
            "0": 36,
            "25" : 45,
            "50" : 56,
            "75" : 120,
            "100" : 12
        },

        "date" : null

      }
    ]
    const ctx = document.getElementById('myChart');
    //var analyticsMood = await this.fetchAnalytics();

    var analyticsMood = mock[0]["data"]
  
    console.log(analyticsMood);
    if (this.state.status !== false) {

      var analytic = analyticsMood;

      this.setState({ analyticsMood });


     this.renderChart(analytic, ctx)
      
    }


  }

  render() {
    return (
      <Container>
        <Canvas id="myChart" />
      </Container>
    );
  }
}



export default ChartEmploye;
