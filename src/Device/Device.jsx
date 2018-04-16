import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Collapse from 'material-ui/transitions/Collapse';
import GardenIcon from 'material-ui-icons/LocalFlorist';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import SettingsIcon from 'material-ui-icons/Settings';
import { userActions } from '../_actions';

class Device extends React.Component {

  /*    componentDidMount() { 
      this.props.dispatch(userActions.reconnectSocket());
  } */

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    
        this.handleClick = value => () => { 
          this.setState({
            open: !this.state.open,
          });
      }
    }

   

    render() {

       
        return (
            <div>
            <ListItem button onClick={this.handleClick()}>
            <ListItemIcon>
              <GardenIcon />
            </ListItemIcon>
            <ListItemText inset primary="Garden" secondary= { this.props.temp + ' °C' }/>
            {this.state.open !== false ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open !== false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button >
                <ListItemText primary="Remove Device" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem button >
                <ListItemText primary="Settings" />
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

function mapStateToProps(state) {
  return {
    temp: state.temperature,
  };
}


const connectedDevice = connect(mapStateToProps)(Device);
export { connectedDevice as Device };