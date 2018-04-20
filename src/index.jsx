import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App';

if (Notification && Notification.permission === 'default') {
  Notification.requestPermission((permission) => {
    if (!('permission' in Notification)) {
      Notification.permission = permission;
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => {
      const data = JSON.parse(localStorage.getItem('user'));
      const { token } = data;

      navigator.serviceWorker.controller.postMessage(token);
      console.log('Successfully registered SW');
    })
    .catch((err) => {
      console.log('Error registering SW: ', err);
    });
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
