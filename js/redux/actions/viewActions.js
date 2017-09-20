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

const setActiveCategory = (category) => {
  return {
    type: 'SET_ACTIVE_CATEOGORY',
    data: { category },
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
  setActiveCategory,
  changeSortType,
  changeSortBy,
  changeEmphasis,
};