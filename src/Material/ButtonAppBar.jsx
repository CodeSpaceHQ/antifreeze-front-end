import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import firebase from 'firebase';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import AboutIcon from 'material-ui-icons/Info';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router'


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {

  
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      logout: props.logout
    }

    this.toggleDrawer = () => {

      this.setState({ open: !this.state.open });

    };


    this.handleClose = () => {


      this.props.history.push('/login');

    };
  }


  render() {
    const { classes } = this.props;
    if (this.state.logout) {
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Freeze-B-Gone
          </Typography>
              <Button variant="raised" color="secondary" onClick={this.handleClose} color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
          <Drawer open={this.state.open} onClose={this.toggleDrawer}>
            <div
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <List style={{ width: 270 }}>
                <ListItem>
                  <ListItemIcon>
                    <AboutIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="About" />
                </ListItem>
              </List>
              <Typography style={{ "fontSize": 15, marginLeft: 18, maxWidth: 250}} align="left">
              The purpose of this project is to design and develop a temperature
               monitoring system which will make use of a Raspberry Pi Zero W and a 
               temperature sensor to track and monitor temperature changes near piping
                systems. 
              </Typography>
            </div>

          </Drawer>


        </div>
      );
    } else {
      return (

        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Freeze-B-Gone
          </Typography>
            </Toolbar>
          </AppBar>
          <Drawer open={this.state.open} onClose={this.toggleDrawer}>
            <div
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <List style={{ width: 270 }}>
                <ListItem>
                  <ListItemIcon>
                    <AboutIcon />
                  </ListItemIcon>
                  <ListItemText  inset primary="About" />

                </ListItem>
              </List>

                <Typography style={{ "fontSize": 15, marginLeft: 18, maxWidth: 250}} align="left">
               The purpose of this project is to design and develop a temperature
               monitoring system which will make use of a Raspberry Pi Zero W and a 
               temperature sensor to track and monitor temperature changes near piping
                systems. 
              </Typography>

            </div>
          </Drawer>

        </div>
      );

    }

  }
}
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const ButtonAppBarWithRouter = withRouter(ButtonAppBar)

export default withStyles(styles)(ButtonAppBarWithRouter);
