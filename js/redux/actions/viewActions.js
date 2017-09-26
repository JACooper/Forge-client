const showTaskForm = () => {
  return {
    type: 'SHOW_TASK_FORM',
  };
};

const hideTaskForm = () => {
  return {
    type: 'HIDE_TASK_FORM',
  };
};

const toggleShowComplete = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETE',
  };
};

const openDetail = (taskID) => {
  return {
    type: 'OPEN_DETAIL',
    data: {id: taskID},
  };
};

const closeDetail = () => {
  return {
    type: 'CLOSE_DETAIL',
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
  openDetail,
  closeDetail,
  changeSortType,
  changeSortBy,
  changeEmphasis,
};