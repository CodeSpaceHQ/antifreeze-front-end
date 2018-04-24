import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import ButtonAppBar from '../Material/ButtonAppBar.jsx';

class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
    this.setChartData = this.setChartData.bind(this);
  }

  componentWillMount() {
    this.getChartData();
    this.setChartData();
  }

  getChartData() {
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://35.226.42.111:8081/rest/device/temp/' + this.props.match.params.device_key,{
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + user.token,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .catch(error => console.error('Error:', error))
      .then((myJson) => {
        var temps = [];
        var times = [];
        for (var i = 0; i < myJson.temps.length; i++) {
          temps.push(myJson.temps[i].temp);
          // convert dates to meaningful values
          times.push(myJson.temps[i].date);
        }
        // setChartData(temps, times);
        this.setChartData(temps, times);
      });
  }

  setChartData(temps, times) {
    this.setState({
      chartData: {
        labels: times, // date time goes here
        datasets: [
          {
            label: 'Temperature',
            // temp data goes here
            data: temps,
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
