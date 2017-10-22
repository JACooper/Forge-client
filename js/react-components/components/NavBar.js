import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className='navbar-wrapper'>
        <div className='nav-content-wrapper'>
          <div className='nav-logo'>
          </div>
          <button
            className='nav-logout'
            type='button'
            onClick={() => {this.props.logout;}}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

}

export default NavBar;