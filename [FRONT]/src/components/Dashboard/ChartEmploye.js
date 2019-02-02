import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';

import Theme from '../../utils/Theme';

// import PropTypes from 'prop-types';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

class ChartEmploye extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    alert('HELLO')
    const theHelp = Chart.helpers;
    const ctx = document.getElementById('myChart');// this.canvasRef;
    Chart.defaults.global.legend.labels.usePointStyle = true;
    // Chart.defaults.global.ticks.= '50px';

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lundi', 'Mardi', 'Merdi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: 'Insatisfait',
            data: [4, 8, 54, 24, 66, 28, 77, 29],
            backgroundColor: Theme.colors.orange73,
          },
          {
            label: 'Satisfait',
            data: [48, 45, 50, 69, 18, 30, 47, 27],
            backgroundColor: Theme.colors.bluefe,
          },
          {
            label: 'Indifférent',
            data: [40, 43, 37, 94, 31, 15, 61, 91],
            backgroundColor: Theme.colors.greybe,
          },
          {
            label: 'Très insatisfait',
            data: [8, 59, 62, 61, 17, 83, 97, 18],
            backgroundColor: '#FAEBCC',
          },
          {
            label: 'Très satisfait',
            data: [75, 59, 18, 23, 35, 60, 40, 47],
            backgroundColor: Theme.colors.rose85,
            // pointStyle: 'rectRounded',
            borderWidth: 1,
            pointStyle: 'rectRounded',
            pointRadius: 5,
            pointBorderColor: 'rgb(0, 0, 0)',
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Satisfaction de vos collaborateurs',
          fontSize: Theme.custom.subtitle,
          fontStyle: 'normal',
          position: 'top',
        },
        scales: {
          xAxes: [{
            stacked: true,
            maxBarThickness: 50,
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              max: 500,
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
          display: true,
          reverse: true,
          labels: {
            fontSize: Theme.custom.bigtext,
            fontColor: Theme.colors.grey5c,

            generateLabels(chart) {
              const { data } = chart;
              if (data.labels.length && data.datasets.length) {
                return data.datasets.map((datasets, i) => {
                  const ds = data.datasets[0];
                  const { getValueAtIndexOrDefault } = theHelp;
                  const arcOpts = chart.options.elements.arc;
                  const fill = datasets.backgroundColor
                    ? datasets.backgroundColor
                    : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);

                  return {
                    text: datasets.label,
                    fillStyle: fill,
                    strokeStyle: fill,
                    lineWidth: 0,
                    index: i,
                    pointStyle: 'rectRounded',
                  };
                });
              }
              return [];
            },
          },
        },
      },
    });
  }

  render() {
    return <Canvas id="myChart" ref={this.canvasRef} />;
  }
}

// DashboardInfos.propTypes = {
//   dataInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default ChartEmploye;
