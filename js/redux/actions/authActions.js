import superagent from 'superagent';

const login = (email, password) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    superagent
      .post('/login')
      .send({ email, password })
      .then((response) => {
        sessionStorage.setItem('session', response.body.id);
        dispatch({ type: 'LOGIN_SUCCESS', data: { id: response.body.id } });
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_FAILURE', data: { error } });
      });
  };
};

const register = (email, password, passwordConfirm) => {
  return (dispatch) => {
    dispatch({ type: 'REGISTER_START' });
    superagent
      .post('/register')
      .send({ email, password, passwordConfirm })
      .then((response) => {
        sessionStorage.setItem('session', response.body.id);
        dispatch({ type: 'REGISTER_SUCCESS', data: { id: response.body.id } });
      })
      .catch((error) => {
        dispatch({ type: 'REGISTER_FAILURE', data: { error } });
      });
  };
};

const logout = () => {
  return (dispatch) => {
    sessionStorage.clear();
    dispatch({ type: 'LOGOUT' });
    superagent.get('/logout');
  };
};

const setAuth = (id) => {
  return {
    type: 'SESSION_STARTED',
    data: { id },
  };
};

const swapAuthState = () => {
  return { type: 'SWAP_STATE' };
};

export {
  login,
  register,
  logout,
  setAuth,
  swapAuthState,
};