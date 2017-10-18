import React from 'react';

class LogDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dateOptions = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    const timeString = (this.props.log.time) ? `${this.props.log.time} hrs` : '';

    return (
      <div className='log-detail-wrapper'>
        <p className='log-detail-date'>{this.props.log.date.toLocaleString('en-US', dateOptions)}</p>
        <p className='log-detail-desc'>{this.props.log.desc}</p>
        <p className='log-detail-time'>{timeString}</p>
      </div>
    );
  }

}

export default LogDetail;