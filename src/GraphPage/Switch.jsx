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
      <div>
        <Typography style={{ color: 'Tomato', fontSize: '15px', padding: '10px 0px 0px 0px', float: 'left', width: '50%', position:'relative' }} gutterBottom variant="headline" component="h2">
          Set Temperature Alert
        </Typography>
        <Typography style={{ color: 'Green', fontSize: '15px', padding: '10px 0px 0px 0px', float: 'left', width: '50%', position:'relative' }} gutterBottom variant="headline" component="h2">
          Current Temperature
        </Typography>
        <Typography style={{ fontSize: '35px', padding: '10px 0px 0px 0px', float: 'right',  marginRight: '10%', width: '30%', position:'relative'}} gutterBottom variant="headline" component="h2">
          {this.props.currTemp}  °C
        </Typography>
        <FormControlLabel style={{ float: 'left', width: '50%', marginBottom: '0px', marginLeft: '0px', position:'relative' }}
          control={
            <Switch
              checked={this.props.alarm != null}
              onChange={this.handleChange}
              value="checked"
            />
          }
          label="Enable Push Notifications"
        />
        {this.props.alarm != null ? <TempSelect temp_change={this.changeTemp.bind(this)} alarm={this.props.alarm} /> : null}

      </div>
    );
  }
}

/* This For loop could have been avoided if the device_key was passed as a numeric index
   Example: obj["device_key"] = "abc", leading to O(1) insted of O(n) time complexity when loading
   the graph page. (n => Number of devices) */

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