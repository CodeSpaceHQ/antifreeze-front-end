import React from 'react';
import { Line } from 'react-chartjs-2';
import ButtonAppBar from '../Material/ButtonAppBar.jsx';

class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            ],
            backgroundColor: 'rgba(0,0,255,.7)',
          },
        ],
      },
    };
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
export default GraphPage;
