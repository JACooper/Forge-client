import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'; // Calls CreateStore, since that's the default export

import App from './react-components/pages/App.js';

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app'),
    () => {
    
    }
  );
};

window.addEventListener('load', init)