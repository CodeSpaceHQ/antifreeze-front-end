import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TempSelect from './TempSelect.jsx';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { userService } from '../_services';

class SwitchLabels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange() {
    this.props.alarm != null ? userService.set_alarm(this.props.device_id, null) : userService.set_alarm(this.props.device_id, 0);
  }

  changeTemp(this_temp) {
    userService.set_alarm(this.props.device_id, parseInt(this_temp));
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{display: 'flex', order:2, alignItems: 'center', flexDirection: 'column',  marginLeft:'50px'}}>
          <Typography style={{ flex: 1, order: 1, color: 'Green', fontSize: '15px' }} gutterBottom variant="headline" component="h2">
            Current Temperature
          </Typography>
          <Typography style={{ flex: 1, order: 2, color: 'Blue', fontSize: '35px' }} gutterBottom variant="headline" component="h2">
            {this.props.currTemp}  °C
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex:3, order:1 }}>
          <Typography style={{ flex: 1, color: 'Tomato', fontSize: '15px' }} gutterBottom variant="headline" component="h2">
            Set Temperature Alert
          </Typography>
          <div style={{ marginLeft:'14px', display: 'flex', flexDirection: 'column', flex: 1}}>
            <FormControlLabel style={{ flex:1 }}
              control={
                <Switch
                  checked={this.props.alarm != null}
                  onChange={this.handleChange}
                  value="checked"
                />
              }
              label="Enable Push Notifications"
            />
            {this.props.alarm != null ? <TempSelect style={{ flex: 1}} temp_change={this.changeTemp.bind(this)} alarm={this.props.alarm} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

function findElement(arr, propName, propValue) {
  for (var i = 0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i];
}

function mapStateToProps(state, ownProps) {
  var device = findElement(state.devices, 'device_key', ownProps.device_id);
  return {
    alarm: device.alarm,
    currTemp: device.temp
  };
}

const connectedSwitchLabels = connect(mapStateToProps)(SwitchLabels);

export { connectedSwitchLabels as SwitchLabels }; 