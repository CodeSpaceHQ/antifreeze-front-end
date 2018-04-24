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
    this.props.devices.map(device => {
      if (device.device_key == this.props.device_id) {
        console.log(device.alarm);
          device.alarm != null ? userService.set_alarm(this.props.device_id, null) : null;
      }
    });
  };

  render() {

    return (
      <div>
        <Typography style={{ color: 'Tomato', fontSize: '15px', padding: '10px 0px 0px 0px' }} gutterBottom variant="headline" component="h2">
          Set Temperature Alert
        </Typography>
        <FormControlLabel style={{ paddingLeft: '10px', marginBottom: '0px' }}
          control={
            <Switch
              checked={this.props.alarm != null}
              onChange={this.handleChange}
              value="checked"
            />
          }
          label="Enable Push Notifications"
        />
        {this.props.alarm != null ? <TempSelect alarm={this.props.alarm} /> : null}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    devices: state.devices,
  };
}

const connectedSwitchLabels = connect(mapStateToProps)(SwitchLabels);

export { connectedSwitchLabels as SwitchLabels }; 