import { combineReducers } from 'redux';

import auth from './authReducer.js';
import task from './taskReducer.js';
import view from './viewReducer.js';

export default combineReducers({
  auth,
  task,
  view,
});