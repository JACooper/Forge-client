import superagent from 'superagent';

const addTask = (task) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_TASK_START' });
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
    dispatch({ type: 'GET_TASKS_START' });
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
    dispatch({ type: 'TOGGLE_COMPLETE_START'});
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

const changeCategory = (taskID, categoryID) => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_CATEGORY_START' });
    superagent
      .post('/changeCategory')
      .send({ taskID, categoryID })
      .then((response) => {
        dispatch({ type: 'CHANGE_CATEGORY_SUCCESS', data: { task: response.body.task }});
      })
      .catch((error) => {
        dispatch({ type: 'CHANGE_CATEGORY_FAILURE', data: { error } });
      });
  };
};

export {
  addTask,
  getTasks,
  toggleComplete,
  changeCategory,
};