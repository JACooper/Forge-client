import React from 'react';
import DateTimeInput from './dateinput/DateTimeInput.js';

class LogForm extends React.Component {
  constructor(props) {
    super(props);

    this.addWorkLog = this.addWorkLog.bind(this);
    this.setLogDate = this.setLogDate.bind(this);

    this.state = {
      date: new Date(),
      desc: '',
      time: '',
    };
  }

  render() {
    return (
      <div className='log-form-wrapper'>
        <DateTimeInput date={this.state.date} submit={this.setLogDate} />
        <input
          className='log-detail-desc'
          type='text'
          placeholder='Work log description'
          value={this.state.desc}
          onChange={(e) => { this.setState({ desc: e.target.value }); }}
        />
        <input
          className='log-detail-time'
          type='text'
          placeholder='# hrs'
          value={this.state.time}
          onKeyDown={this.restrictInput}
          onChange={(e) => { this.setState({ time: e.target.value }); }}
        />

        <button
          className='add-detail-log'
          type='button'
          onClick={() => {this.addWorkLog();}}
        >
          Log work
        </button>

        <button
          className='cancel-detail-log'
          type='button'
          onClick={() => {this.props.closeLogForm();}}
        >
          Cancel
        </button>
      </div>
    );
  }

  setLogDate(date) {
    this.setState({ date: date });
  }

  addWorkLog() {
    const log = {};
    log.date = this.state.date;
    log.date.setSeconds(0);
    const desc = this.state.desc;
    const time = this.state.time;

    if (desc !== undefined && desc !== null && desc !== '') {
      log.desc = desc;
    }

    if (time !== undefined && time !== null && time !== '') {
      log.time = time;
    }

    this.setState({
      date: new Date(),
      desc: '',
      time: '',
    });

    if (log.date && (log.desc || log.time)) {
      this.props.addLog(log);
    }
  }
}

export default LogForm;