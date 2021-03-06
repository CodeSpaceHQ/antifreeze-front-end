import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/AddAlert';
import Collapse from 'material-ui/transitions/Collapse';
import GardenIcon from 'material-ui-icons/AcUnit';
import AlarmOnIcon from 'material-ui-icons/AlarmOn';
import AlarmOffIcon from 'material-ui-icons/AlarmOff';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import SettingsIcon from 'material-ui-icons/Timeline';
import { userActions } from '../_actions';
import { history } from '../_helpers';

const Device = class Device extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClick = value => () => {
      this.setState({
        open: !this.state.open,
      });
    };

    this.redirectToGraph = this.redirectToGraph.bind(this);
    this.redirectToAlert = this.redirectToAlert.bind(this);

  }

  redirectToGraph() {

      history.push(`/graph/${this.props.device_key}`);

  }

  redirectToAlert() {

    history.push(`/alert/${this.props.device_key}`);

  }

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClick()}>
          <ListItemIcon>
            <GardenIcon />
          </ListItemIcon>
          <ListItemText inset primary={this.props.name} secondary={this.props.temp + ' °C'} />
          <ListItemIcon>
            {
              this.props.alarm == null ? (
                <AlarmOffIcon />
              ) : (
                  <AlarmOnIcon />
                )
            }
          </ListItemIcon>
          {this.state.open !== false ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open !== false} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={this.redirectToAlert}>
              <ListItemText primary="Alert Settings" />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button onClick={this.redirectToGraph}>
              <ListItemText primary="Temperature Graph" />
              <ListItemSecondaryAction>
                <IconButton aria-label="Settings">
                  <SettingsIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

export default Device;
