import React from 'react';
import logoutImg from '../../../build/assets/img/logout-20px.png';

class SettingsDropdown extends React.Component {
  constructor(props) {
    super(props);

    // Set up references to detect when user clicks outside of calendar component
    // See: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    this.clickOutside = this.clickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnount() {
    document.removeEventListener('click', this.clickOutside);
  }

  render() {
    return (
      <div className='settings-dropdown-wrapper' ref={(wrapper) => {this.wrapperRef = wrapper;}}>
        <ul className='settings-dropdown-list'>
          <li className='settings-dropdown-item' onClick={this.props.logout}>
            <img className='settings-dropdown-icon' src={logoutImg} alt=''/>
            Logout
          </li>
        </ul>
      </div>
    );
  }

  clickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggleDropdown();
    }
  }

}

export default SettingsDropdown;