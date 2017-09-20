import superagent from 'superagent';

const addTask = (task) => {
  return (dispatch) => {
    dispatch({type: 'ADD_TASK_START', data: null});
    superagent
      .post('/task')
      .send({ task })
      .then(() => {
        dispatch({ type: 'ADD_TASK_SUCCESS', data: null });
      })
      .catch((error) => {
        dispatch({ type: 'ADD_TASK_FAILURE', data: {
          error
        }
        });
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
        dispatch({ type: 'GET_TASKS_SUCCESS', data: {
          tasks: response.body.tasks
        }
        });
      })
      .catch((error) => {
        dispatch({ type: 'GET_TASKS_FAILURE', data: {
          error
        }
        });
      });
  };
};

export {
  addTask,
  getTasks,
};