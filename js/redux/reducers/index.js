import { combineReducers } from 'redux';

import auth from './authReducer.js';
import task from './taskReducer.js';

export default combineReducers({
  auth,
  task,
});