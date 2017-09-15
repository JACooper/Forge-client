import superagent from 'superagent';

const login = (email, password) => {
  return (dispatch) => {
    dispatch({type: 'LOGIN_START', data: null});
    superagent
      .post('/login')
      .send({ email, password })
      .then((response) => {
        sessionStorage.setItem('session', response.body.id);
        dispatch({ type: 'LOGIN_SUCCESS', data: {
            id: response.body.id,
          }
        });
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_FAILURE', data: {
            error
          }
        });
      });
  };
};

const register = (email, password, passwordConfirm) => {
  return (dispatch) => {
    dispatch({type: 'REGISTER_START', data: null});
    superagent
      .post('/register')
      .send({ email, password, passwordConfirm })
      .then((response) => {
        sessionStorage.setItem('session', response.body.id);
        dispatch({ type: 'REGISTER_SUCCESS', data: {
            id: response.body.id,
          }
        });
      })
      .catch((error) => {
        dispatch({ type: 'REGISTER_FAILURE', data: {
            error
          }
        })
      });
  };
};

const logout = () => {
  return (dispatch) => {
    sessionStorage.clear();
    dispatch({ type: 'LOGOUT', data: null });
    superagent.get('/logout');
    // Framework to return case for unsuccessful logouts. . .
    //  perhaps excessive, but leaving it here for now
  };
};

const setAuth = (id) => {
  return {
    type: 'SESSION_STARTED',
    data: { id }
  };
};

const swapAuthState = () => {
  return {
    type: 'SWAP_STATE',
    data: null
  };
};

module.exports.login = login;
module.exports.register = register;
module.exports.logout = logout;
module.exports.setAuth = setAuth;
module.exports.swapAuthState = swapAuthState;