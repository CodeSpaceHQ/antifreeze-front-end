import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GardenIcon from 'material-ui-icons/LocalFlorist';
import KitchenIcon from 'material-ui-icons/Kitchen';
import BathRoomIcon from 'material-ui-icons/HotTub';
import DeleteIcon from 'material-ui-icons/Delete';
import SettingsIcon from 'material-ui-icons/Settings';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import ListSubheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import { Device } from '../Device';
import { userActions } from '../_actions';
import { connect } from 'react-redux';
import { userService } from '../_services'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {

  componentDidMount() {
    this.props.dispatch(userActions.reconnectSocket());
  }


  constructor() {
    super()


  }
  render() {


    return (
      <div>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Devices</ListSubheader>}>
          {
            this.props.devices.map(device =>
              <Device key={device.device_key} name={device.name} alarm={device.alarm} temp={device.temp}/>
          )}
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    devices: state.devices,
  };
}

const connectedNestedList = connect(mapStateToProps)(NestedList);

export default withStyles(styles)(connectedNestedList);
