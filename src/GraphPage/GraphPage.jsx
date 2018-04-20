import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import ButtonAppBar from '../Material/ButtonAppBar.jsx';
import { authHeader } from '../_helpers';
import { store } from '../_helpers';

class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }
  
  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://35.226.42.111:8081/rest/device/temp/' + this.props.location.state.device_id,{
      method: 'GET',
      headers: authHeader(),
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });


    // Hardcoding in graph data
    this.setState({
      chartData: {
        labels: ['February 1', 'March 1', 'April 1'], // date time goes here
        datasets: [
          {
            label: 'Temperature',
            // temp data goes here
            data: [
              20,
              23,
              25,
              30
            ],
            backgroundColor: 'rgba(0,0,255,.7)',
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className='text-center'>
        <ButtonAppBar />
        <Line data={this.state.chartData} />
      </div>
    );
  }
}

GraphPage.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.array,
  }),
};

GraphPage.defaultProps = {
  chartData: {},
};

export default GraphPage;
