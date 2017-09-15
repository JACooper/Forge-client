const initialState = {
  showTaskForm: false,
  sortType: 'ascending',
  sortBy: 'sum,'
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  
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
  }

  return state;
};