import superagent from 'superagent';

const addTask = (task) => {
  return (dispatch) => {
    dispatch({type: 'ADD_TASK_START', data: null});
    superagent
      .post('/task')
      .send({ task })
      .then((response) => {
        dispatch({ type: 'ADD_TASK_SUCCESS', data: { task: response.body.task } });
      })
      .catch((error) => {
        dispatch({ type: 'ADD_TASK_FAILURE', data: { error } });
      });
  };
};

const getTasks = () => {
  return (dispatch) => {
    dispatch({type: 'GET_TASKS_START', data: null});
    superagent
      .get('/tasks')
      //.query()
      .then((response) => {
        dispatch({ type: 'GET_TASKS_SUCCESS', data: { tasks: response.body.tasks } });
      })
      .catch((error) => {
        dispatch({ type: 'GET_TASKS_FAILURE', data: { error } });
      });
  };
};

const toggleComplete = (taskID) => {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_COMPLETE_START', data: null });
    superagent
      .post('/complete')
      .send({ id: taskID })
      .then((response) => {
        dispatch({ type: 'TOGGLE_COMPLETE_SUCCESS', data: { task: response.body.task } });
      })
      .catch((error) => {
        dispatch({ type: 'TOGGLE_COMPLETE_FAILURE', data: { error } });
      });
  };
};

export {
  addTask,
  getTasks,
  toggleComplete,
};