const showTaskForm = () => {
  return {
    type: 'SHOW_TASK_FORM',
    data: null,
  };
};

const hideTaskForm = () => {
  return {
    type: 'HIDE_TASK_FORM',
    data: null,
  };
};

const toggleShowComplete = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETE',
    data: null,
  };
};

const changeSortType = (sortType) => {
  return {
    type: 'CHANGE_SORT_TYPE',
    data: { sortType },
  };
};

const changeSortBy = (sortBy) => {
  return {
    type: 'CHANGE_SORT_BY',
    data: { sortBy },
  };
};

const changeEmphasis = (emphasis) => {
  return {
    type: 'CHANGE_EMPHASIS',
    data: { emphasis },
  };
};

export {
  showTaskForm,
  hideTaskForm,
  toggleShowComplete,
  changeSortType,
  changeSortBy,
  changeEmphasis,
};