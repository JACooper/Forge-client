import React from 'react';
import { connect } from 'react-redux';

// import Task from '../components/Task.js';
import * as AuthActions from '../../redux/actions/authActions.js';

@connect((store) => {
  return {
    loginState: store.auth.loginState,
  };
})
class Auth extends React.Component {
  constructor(props) {
    super();

    this.authAction = this.authAction.bind(this);
    this.swapState = this.swapState.bind(this);
    
    this.state = {
      email: '',
      password: '',
      confirmation: '',
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loginState) {
      this.setState({confirmation: ''});
    }
  }

  render() {
    const actionButtonText = this.props.loginState ? 'Login' : 'Register';
    const toggleButtonText = this.props.loginState ? 'Register' : 'Login';

    const confirmationField = this.props.loginState ? (null) : (
        <input
          type='password'
          value={this.state.confirmation}
          placeholder='Confirm password'
          onChange={(e) => {this.setState({confirmation: e.target.value})}}
        />
      );

    return (
      <div>
        <input
          type='text'
          value={this.state.email}
          placeholder='Email address'
          onChange={(e) => {this.setState({email: e.target.value})}}
        />
        <input
          type='password'
          value={this.state.password}
          placeholder='Password'
          onChange={(e) => {this.setState({password: e.target.value})}}
        />
        {confirmationField}
        <input type='button' value={actionButtonText} onClick={this.authAction}/>
        <input type='button' value={toggleButtonText} onClick={this.swapState}/>
      </div>
    );
  }

  authAction() {
    const email = this.state.email;

    // Regex comes from:
    // https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
    if (!email.search('^[^\s@]+@[^\s@]+\.[^\s@]+$')) {
      console.log('invalid email!');
      // dispatch invalid email error
    }

    if (this.props.loginState) {
      // Check for parameter authenticity
      this.props.dispatch(AuthActions.login(this.state.email,
                                            this.state.password));
    } else {
      // Check for parameter authenticity
      this.props.dispatch(AuthActions.register(this.state.email,
                                                this.state.password,
                                                this.state.confirmation));
    }
  }

  swapState() {
    this.props.dispatch(AuthActions.swapAuthState());
  }
}

export default Auth;