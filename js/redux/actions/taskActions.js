import superagent from 'superagent';

// Will have other task parameters later
const addTask = (task) => {
  return (dispatch) => {
    dispatch({type: 'ADD_TASK_START', data: null});
    superagent
      .post('/task')
      .send({ task })
      .then((response) => {
        dispatch({ type: 'ADD_TASK_SUCCESS', data: null })
      })
      .catch((error) => {
        dispatch({ type: 'ADD_TASK_FAILURE', data: error })
      });
  };
};

// Will have user parameter later
const getTasks = () => {
  return (dispatch) => {
    dispatch({type: 'GET_TASKS_START', data: null});
    superagent
      .get('/tasks')
      //.query()
      .then((response) => {
        dispatch({ type: 'GET_TASKS_SUCCESS', data: response.body.tasks })
      })
      .catch((error) => {
        dispatch({ type: 'GET_TASKS_FAILURE', data: error })
      });
  };
};

module.exports.addTask = addTask;
module.exports.getTasks = getTasks;