import React from 'react';
import { connect } from 'react-redux';

import App from './App.js';
import Auth from './Auth.js';
import * as AuthActions from '../../redux/actions/authActions.js';
import * as TaskActions from '../../redux/actions/taskActions.js';

@connect((store) => {
  return {
    showLogin: store.auth.showLogin,
    session: store.auth.session,
  }
})
class Wrapper extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    const storedSession = sessionStorage.getItem('session');
    if (storedSession !== null && this.props.session === null) {
      this.props.dispatch(AuthActions.setAuth(storedSession));
    }
  }

  render() {
    const view = this.props.session ? <App /> : <Auth />;

    return (
      <div>
        {view}
      </div>
    );
  }
}

export default Wrapper;