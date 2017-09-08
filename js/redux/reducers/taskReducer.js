const initialState = {
  tasks: [],
  addingTask: false,
  gettingTasks: false,
  addTaskError: null,
  getTasksError: null,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case 'ADD_TASK_START':
    return {
      ...state,
      addingTask: true,
      addTaskError: null,
    };
  case 'ADD_TASK_SUCCESS':
    return {
      ...state,
      addingTask: false,
      addTaskError: null,
    };
  case 'ADD_TASK_FAILURE':
    return {
      ...state,
      addingTask: false,
      addTaskError: action.data,
    };

  case 'GET_TASKS_START':
    return {
      ...state,
      gettingTasks: true,
      getTasksError: null,
    };
  case 'GET_TASKS_SUCCESS':
    return {
      ...state,
      tasks: action.data,
      gettingTasks: false,
      getTasksError: null,
    };
  case 'GET_TASKS_FAILURE':
    return {
      ...state,
      gettingTasks: false,
      getTasksError: action.data,
    };
  }

  return state;
};