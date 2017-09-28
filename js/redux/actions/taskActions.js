import superagent from 'superagent';

const addTask = (task) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_TASK_START' });
    superagent
      .post('/task')
      .send({ task })
      .then((response) => {
        const task = response.body.task;
        task.startDate = (task.startDate) ? new Date(task.startDate) : null;
        task.dueDate = (task.dueDate) ? new Date(task.dueDate) : null;

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
      .then((response) => {
        const tasks = response.body.tasks.map((task) => {
          task.startDate = (task.startDate) ? new Date(task.startDate) : null;
          task.dueDate = (task.dueDate) ? new Date(task.dueDate) : null;
          return task;
        });

        dispatch({ type: 'GET_TASKS_SUCCESS', data: { tasks } });
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
        const task = response.body.task;
        task.startDate = (task.startDate) ? new Date(task.startDate) : null;
        task.dueDate = (task.dueDate) ? new Date(task.dueDate) : null;

        dispatch({ type: 'TOGGLE_COMPLETE_SUCCESS', data: { task } });
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
        const task = response.body.task;
        task.startDate = (task.startDate) ? new Date(task.startDate) : null;
        task.dueDate = (task.dueDate) ? new Date(task.dueDate) : null;

        dispatch({ type: 'CHANGE_CATEGORY_SUCCESS', data: { task }});
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