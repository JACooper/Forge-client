import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'; // Calls CreateStore, since that's the default export

import Wrapper from './react-components/pages/Wrapper.js';
import '../css/Forge.scss';

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Wrapper />
    </Provider>,
    document.querySelector('#app'),
    () => {
    
    }
  );
};

window.addEventListener('load', init);