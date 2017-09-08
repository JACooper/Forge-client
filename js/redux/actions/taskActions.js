import superagent from 'superagent';

// Will have other task parameters later
const addTask = (task) => {
  return (dispatch) => {
    dispatch({type: 'ADD_TASK_START', data: null});
    superagent
      .post('/task')
      .send({ task })
      .then(
        dispatch({
          type: 'ADD_TASK_SUCCESS', data: null
        }),
        dispatch({
          type: 'ADD_TASK_FAILURE', data: error
        }),
      );
  };
};

// Will have user parameter later
const getTasks = () => {
  return (dispatch) => {
    dispatch({type: 'GET_TASKS_START', data: null});
    superagent
      .get('/tasks')
      //.query()
      .then(
        dispatch({
          type: 'GET_TASKS_SUCCESS', data: response.body.tasks
        }),
        dispatch({
          type: 'GET_TASKS_FAILURE', data: error
        }),
      );
  };
};

module.exports.addTask = addTask;
module.exports.getTasks = getTasks;