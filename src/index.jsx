import React from 'react';
import { render } from 'react-dom'
import { HashRouter, Route, IndexRoute, hashHistory } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App';

// Initaial Unauthorized Websocket Connection


render(
      <Provider store={store}>
          <App />
      </Provider>,
      document.getElementById('app')
  );