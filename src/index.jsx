import React from 'react';
import ReactDom from 'react-dom';
import { cyan500, orange300, blueGrey400, limeA100, grey400, darkBlack, purpleA100, lightBlue50 } from 'material-ui/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import notification from './notification.js';

render(
  <h1>stuff</h1>,
  document.getElementById('app'),
);
