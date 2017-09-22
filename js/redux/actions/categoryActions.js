import superagent from 'superagent';

const setActiveCategory = (category) => {
  return {
    type: 'SET_ACTIVE_CATEGORY',
    data: { category },
  };
};

const addCategory = (category) => {
  return (dispatch) => {
    dispatch({type: 'ADD_CATEGORY_START', data: null});
    superagent
      .post('/category')
      .send({ category })
      .then(() => {
        dispatch({ type: 'ADD_CATEGORY_SUCCESS', data: null });
      })
      .catch((error) => {
        dispatch({ type: 'ADD_CATEGORY_FAILURE', data: { error } });
      });
  };
};

const getCategories = () => {
  return (dispatch) => {
    dispatch({type: 'GET_CATEGORIES_START', data: null});
    superagent
      .get('/categories')
      .then((response) => {
        dispatch({
          type: 'GET_CATEGORIES_SUCCESS',
          data: { categories: response.body.categories }
        });
      })
      .catch((error) => {
        dispatch({
          type: 'GET_CATEGORIES_FAILURE',
          data: { error }
        });
      });
  };
};

export {
  setActiveCategory,
  addCategory,
  getCategories,
};