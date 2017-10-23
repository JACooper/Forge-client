import React from 'react';
import SettingsDropdown from './SettingsDropdown.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settings = (this.props.showDropdown) ? (
        <SettingsDropdown toggleDropdown={this.props.toggleDropdown} logout={this.props.logout} />
      ) : (null);

    return (
      <div className='navbar-wrapper'>
        <div className='nav-content-wrapper'>
          <div className='nav-logo'>
          </div>
          <div className='nav-settings'>
            <button
              className='nav-settings-button'
              type='button'
              onClick={this.props.toggleDropdown}
            />
            {settings}
          </div>
        </div>
      </div>
    );
  }

}

export default NavBar;