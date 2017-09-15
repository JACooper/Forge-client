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

module.exports.showTaskForm   = showTaskForm;
module.exports.hideTaskForm   = hideTaskForm;
module.exports.changeSortType = changeSortType;
module.exports.changeSortBy   = changeSortBy;
module.exports.changeEmphasis = changeEmphasis;