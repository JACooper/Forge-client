const initialState = {
  tasks: [],
  addingTask: false,      // Display progress spinner, should stop after success/failure
  addTaskSuccess: false,  // Display success message, close window
  addTaskError: null,     // Display error, should go away after success/new attempt (or X amount of time?)
  
  gettingTasks: false,    // Display progress spinner, should stop after success/failure
  getTasksError: null,    // Display error, should go away after success/new attempt (or X amount of time?)
  
  togglingComplete: false,
  toggleCompleteError: null,
  
  updatingTask: false,
  updateTaskSuccess: false,
  updateTaskError: null,
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
      tasks: state.tasks.concat(action.data.task),
      addingTask: false,
      addTaskSuccess: true,
      addTaskError: null,
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

  case 'UPDATE_TASK_START':
    return {
      ...state,
      updatingTask: true,
      updateTaskSuccess: false,
      updateTaskError: null,
    };
  case 'UPDATE_TASK_SUCCESS': { 
    const updatedTasks = state.tasks.filter((task) => {
      return task._id !== action.data.task._id;
    });
    updatedTasks.push(action.data.task);

    return {
      ...state,
      tasks: updatedTasks,
      updatingTask: false,
      updateTaskSuccess: true,
      updateTaskError: null,
    };
  }
  case 'UPDATE_TASK_FAILURE':
    return {
      ...state,
      updatingTask: false,
      updateTaskSuccess: false,
      updateTaskError: action.data.error,
    };

  case 'TOGGLE_COMPLETE_START':
    return {
      ...state,
      togglingComplete: true,
      toggleCompleteError: null,
    };
  case 'TOGGLE_COMPLETE_SUCCESS': {
    const updatedTasks = state.tasks.filter((task) => {
      return task._id !== action.data.task._id;
    });
    updatedTasks.push(action.data.task);

    return {
      ...state,
      tasks: updatedTasks,
      togglingComplete: false,
      toggleCompleteError: null,
    };
  }
  case 'TOGGLE_COMPLETE_FAILURE':
    return {
      ...state,
      togglingComplete: false,
      toggleCompleteError: action.data.error,
    };

  case 'CHANGE_CATEGORY_START':
    return {
      ...state,
      changingCategory: true,
      changeCategoryError: null,
    };
  case 'CHANGE_CATEGORY_SUCCESS': {
    const updatedTasks = state.tasks.filter((task) => {
      return task._id !== action.data.task._id;
    });
    updatedTasks.push(action.data.task);

    return {
      ...state,
      tasks: updatedTasks,
      changingCategory: false,
      changeCategoryError: null,
    };
  }
  case 'CHANGE_CATEGORY_FAILURE':
    return {
      ...state,
      changingCategory: false,
      changeCategoryError: action.data.error,
    };
  }

  return state;
}