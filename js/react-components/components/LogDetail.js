import React from 'react';

class LogDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='log-detail-wrapper'>
        <p>{this.props.log.date.toUTCString()}</p>
        <p>{this.props.log.desc}</p>
        <p>{this.props.log.time}</p>
      </div>
    );
  }

}

export default LogDetail;