import superagent from 'superagent';

const addTask = (task) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_TASK_START' });
    superagent
      .post('/task')
      .send({ task })
      .then((response) => {
        const task = populateTaskDate(response.body.task);
        dispatch({ type: 'ADD_TASK_SUCCESS', data: { task } });
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
          return populateTaskDate(task);
        });

        dispatch({ type: 'GET_TASKS_SUCCESS', data: { tasks } });
      })
      .catch((error) => {
        dispatch({ type: 'GET_TASKS_FAILURE', data: { error } });
      });
  };
};

const updateTask = (taskId, updatedFields) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_TASK_START' });
    superagent
      .post('/update')
      .send({ id: taskId, ...updatedFields })
      .then((response) => {
        const task = populateTaskDate(response.body.task);
        dispatch({ type: 'UPDATE_TASK_SUCCESS', data: { task } });
      })
      .catch((error) => {
        dispatch({ type: 'UPDATE_TASK_FAILURE', data: { error } });
      });
  };
};

const addLog = (taskID, log) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_LOG_START' });
    superagent
      .post('/log')
      .send({ taskID, ...log })
      .then((response) => {
        const task = populateTaskDate(response.body.task);
        dispatch({ type: 'ADD_LOG_SUCCESS', data: { task } });
      })
      .catch((error) => {
        dispatch({ type: 'ADD_LOG_FAILURE', data: { error } });
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
        const task = populateTaskDate(response.body.task);
        dispatch({ type: 'TOGGLE_COMPLETE_SUCCESS', data: { task } });
      })
      .catch((error) => {
        dispatch({ type: 'TOGGLE_COMPLETE_FAILURE', data: { error } });
      });
  };
};

const populateTaskDate = (_task) => {  
  const task = _task;
  task.startDate = (task.startDate) ? new Date(task.startDate) : null;
  task.dueDate = (task.dueDate) ? new Date(task.dueDate) : null;
  if (task.log) {
    task.log.forEach((log) => {
      log.date = new Date(log.date);
    });
  }

  return task;
};

export {
  addTask,
  getTasks,
  updateTask,
  addLog,
  toggleComplete,
};