const initialState = {
  loginState: true, // true == login, false == register
  session: null,
  loginError: '',
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN_START':
    return {
      ...state,
      loginError: '',
    };
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      session: action.data.id,
    };
  case 'LOGIN_FAILURE':
    return {
      ...state,
      loginError: action.data.error,
    };

  case 'REGISTER_START':
    return {
      ...state,
      loginError: '',
    };
  case 'REGISTER_SUCCESS':
    return {
      ...state,
      session: action.data.id,
      loginError: action.data.error,
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
      loginError: '',
    };
  }

  return state;
}