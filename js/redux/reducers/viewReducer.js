const initialState = {
  showTaskForm: false,
  showComplete: false,
  sortType: 'ascending',
  sortBy: 'sum',
  emphasis: 'none',
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  
  case 'ADD_TASK_SUCCESS':
    return {
      ...state,
      showTaskForm: false,
    };
  case 'SHOW_TASK_FORM':
    return {
      ...state,
      showTaskForm: true,
    };
  case 'HIDE_TASK_FORM':
    return {
      ...state,
      showTaskForm: false,
    };

  case 'CHANGE_SORT_TYPE':
    return {
      ...state,
      sortType: action.data.sortType,
    };
  case 'CHANGE_SORT_BY':
    return {
      ...state,
      sortBy: action.data.sortBy,
    };
  case 'CHANGE_EMPHASIS':
    return {
      ...state,
      emphasis: action.data.emphasis,
    };

  case 'TOGGLE_SHOW_COMPLETE':
    return {
      ...state,
      showComplete: !state.showComplete,
    };
  }

  return state;
}