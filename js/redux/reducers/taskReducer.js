const initialState = {
  tasks: [],
  addingTask: false,      // Display progress spinner, should stop after success/failure
  addTaskError: null,     // Display error, should go away after success/new attempt (or X amount of time?)
  addTaskSuccess: false,  // Display success message, close window
  shouldGetTasks: true,
  gettingTasks: false,    // Display progress spinner, should stop after success/failure
  getTasksError: null,    // Display error, should go away after success/new attempt (or X amount of time?)
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case 'ADD_TASK_START':
    return {
      ...state,
      addingTask: true,
      addTaskError: null,
      addTaskSuccess: false,
    };
  case 'ADD_TASK_SUCCESS':
    return {
      ...state,
      addingTask: false,
      shouldGetTasks: true,
      addTaskError: null,
      addTaskSuccess: true,
    };
  case 'ADD_TASK_FAILURE':
    return {
      ...state,
      addingTask: false,
      addTaskError: action.data.error,
      addTaskSuccess: false,
    };

  case 'GET_TASKS_START':
    return {
      ...state,
      shouldGetTasks: false,
      gettingTasks: true,
      getTasksError: null,
    };
  case 'GET_TASKS_SUCCESS':
    return {
      ...state,
      tasks: action.data.tasks,
      gettingTasks: false,
      getTasksError: null,
    };
  case 'GET_TASKS_FAILURE':
    return {
      ...state,
      gettingTasks: false,
      getTasksError: action.data.error,
    };
  }

  return state;
};