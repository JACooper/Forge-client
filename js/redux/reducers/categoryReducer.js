const initialState = {
  activeCategory: '',
  categories: [],
  addingCategory: false,
  addCategorySuccess: false,
  addCategoryError: null,
  gettingCategories: false,
  getCategoriesError: null,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  
  case 'SET_ACTIVE_CATEGORY':
    return {
      ...state,
      activeCategory: action.data.category,
    };

  case 'ADD_CATEGORY_START':
    return {
      ...state,
      addingCategory: true,
      addCategoryError: null,
      addCategorySuccess: false,
    };
  case 'ADD_CATEGORY_SUCCESS':
    return {
      ...state,
      categories: state.categories.concat(action.data.category),
      addingCategory: false,
      addCategoryError: null,
      addCategorySuccess: true,
    };
  case 'ADD_CATEGORY_FAILURE':
    return {
      ...state,
      addingCategory: false,
      addCategoryError: action.data.error,
      addCategorySuccess: false,
    };

  case 'GET_CATEGORIES_START':
    return {
      ...state,
      gettingCategories: true,
      getCategoriesError: null,
    };
  case 'GET_CATEGORIES_SUCCESS':
    return {
      ...state,
      categories: action.data.categories,
      gettingCategories: false,
      getCategoriesError: null,
    };
  case 'GET_CATEGORIES_FAILURE':
    return {
      ...state,
      gettingCategories: false,
      getCategoriesError: action.data.error,
    };
  }

  return state;
}