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
    super(props);

    this.authAction = this.authAction.bind(this);
    this.swapState = this.swapState.bind(this);
    
    this.state = {
      email: '',
      password: '',
      confirmation: '',
    };
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
      className='auth-input-field'
        type='password'
        value={this.state.confirmation}
        placeholder='Confirm password'
        onChange={(e) => {this.setState({confirmation: e.target.value});}}
      />
    );

    const errorText = (this.props.loginError) ? (
      <p className='auth-error-text'>{this.props.loginError}</p>
    ) : (null);

    return (
      <div className='auth-wrapper'>
        <div className='auth-nav-wrapper'>
          <div className='auth-nav-content'>
            <div className='nav-logo'>
            </div>
            <button
                className='auth-swap'
                type='button'
                onClick={this.swapState}
            >
              {toggleButtonText}
            </button>
          </div>
        </div>

        <div className='auth-main'>
          <div>
            <h1 className='auth-title'>Forge</h1>
            <h3 className='auth-tagline'>a better you</h3>
          </div>
          <div className='auth-form'>
            <input
            className='auth-input-field'
              type='text'
              value={this.state.email}
              placeholder='Email address'
              onChange={(e) => {this.setState({email: e.target.value});}}
            />
            <input
            className='auth-input-field'
              type='password'
              value={this.state.password}
              placeholder='Password'
              onChange={(e) => {this.setState({password: e.target.value});}}
            />
            {confirmationField}
            <input
              className='auth-action'
              type='button'
              value={actionButtonText}
              onClick={this.authAction}
            />
            {errorText}
          </div>
        </div>
      </div>
    );
  }

  authAction() {
    const email = this.state.email;

    // Regex comes from:
    // https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
    if (!email.search('^[^\s@]+@[^\s@]+\.[^\s@]+$')) {
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