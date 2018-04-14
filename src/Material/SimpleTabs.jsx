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

  constructor() {
    super()


  }
  render() {
  

    return (
      <div>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Devices</ListSubheader>}
        >
        <Device/>

          {/*
          <ListItem button onClick={this.handleClick(0)}>
            <ListItemIcon>
              <GardenIcon />
            </ListItemIcon>
            <ListItemText inset primary="Garden" secondary= { this.state.temp + ' °C' }/>
            {this.state.open.indexOf(0) !== -1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open.indexOf(0) !== -1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Remove Device" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemText primary="Settings" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Settings">
                    <SettingsIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Collapse>

        
          <ListItem button onClick={this.handleClick(1)}>
            <ListItemIcon>
              <BathRoomIcon />
            </ListItemIcon>
            <ListItemText inset primary="BathRoom" secondary="20 °C" />
            {this.state.open.indexOf(1) !== -1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open.indexOf(1) !== -1} timeout="auto" unmountOnExit>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Remove Device" />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button className={classes.nested}>
              <ListItemText primary="Settings" />
              <ListItemSecondaryAction>
                <IconButton aria-label="Settings">
                  <SettingsIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Collapse>

          <ListItem button onClick={this.handleClick(2)}>
            <ListItemIcon>
              <KitchenIcon />
            </ListItemIcon>
            <ListItemText inset primary="Kitchen" secondary="22 °C" />
            {this.state.open.indexOf(2) !== -1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open.indexOf(2) !== -1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <ListItem button className={classes.nested}>
                <ListItemText primary="Remove Device" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemText primary="Settings" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Settings">
                    <SettingsIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

            </List>
          </Collapse>
          */}

        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NestedList);
