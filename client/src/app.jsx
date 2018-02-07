import React from 'react';
import ReactDom from 'react-dom';
import { cyan500, orange300, blueGrey400, limeA100, grey400, darkBlack, purpleA100, lightBlue50 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,

  }, 
  fontFamily:  'Roboto, sans-serif',
  palette: {
  	canvasColor: lightBlue50,
    borderColor: grey400,
  },
});

ReactDom.render((
  <MuiThemeProvider muiTheme={ muiTheme }>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>), document.getElementById('react-app'));
