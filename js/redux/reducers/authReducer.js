const initialState = {
  loginState: true, // true == login, false == register
  session: null,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN_START':
    return {
      ...state,
      
    };
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      session: action.data.id,
    };
  case 'LOGIN_FAILURE':
    return {
      ...state,
      
    };

  case 'REGISTER_START':
    return {
      ...state,
      
    };
  case 'REGISTER_SUCCESS':
    return {
      ...state,
      session: action.data.id,
    };
  case 'REGISTER_FAILURE':
    return {
      ...state,
      
    };

  case 'LOGOUT':
    return {
      ...state,
      session: null
    };

  case 'SESSION_STARTED':
    return {
      ...state,
      session: action.data.id,
    };

  case 'SWAP_STATE':
    return {
      ...state,
      loginState: !(state.loginState),
    };
  }

  return state;
};