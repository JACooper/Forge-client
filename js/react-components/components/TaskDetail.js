import React from 'react';
import DateInput from './dateinput/DateInput.js';
import DateTimeInput from './dateinput/DateTimeInput.js';
import LogDetail from './LogDetail.js';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.updateTask = this.updateTask.bind(this);
    this.addWorkLog = this.addWorkLog.bind(this);
    this.showLogForm = this.showLogForm.bind(this);
    this.closeLogForm = this.closeLogForm.bind(this);

    // Only use task props for initial state - subsequent form data should come from user input
    this.state = {
      title: this.props.title,
      time: this.props.time,
      effort: this.props.effort,
      focus: this.props.focus,
      category: this.props.category,
      startDate: this.props.startDate,
      dueDate: this.props.dueDate,
      complete: this.props.complete,
      logDate: new Date(),
      logDesc: '',
      logTime: '',
      // showLog: false,
      showLogForm: false,
      dirty: false,
    };
  }

  render() {
    const timeRating = [];
    const effortRating = [];
    const focusRating = [];

    for (let stars = 1; stars <= 3; stars++) {
      if (stars <= this.props.time) {
        timeRating.push(<div className='task-rating-full' key={stars} />);
      } else {
        timeRating.push(<div className='task-rating-empty' key={stars} />);
      }

      if (stars <= this.props.effort) {
        effortRating.push(<div className='task-rating-full' key={stars} />);
      } else {
        effortRating.push(<div className='task-rating-empty' key={stars} />);
      }

      if (stars <= this.props.focus) {
        focusRating.push(<div className='task-rating-full' key={stars} />);
      } else {
        focusRating.push(<div className='task-rating-empty' key={stars} />);
      }
    }

    const addLog = (this.state.showLogForm) ? (
      <div>
        <DateTimeInput date={this.state.logDate} submit={this.setLogDate} />
        <input
          className='log-detail-desc'
          type='text'
          placeholder='Work log description'
          value={this.state.logDesc}
          onChange={(e) => { this.setState({ logDesc: e.target.value }); }}
        />
        <input
          className='log-detail-time'
          type='text'
          placeholder='# hrs'
          value={this.state.logTime}
          onKeyDown={this.restrictInput}
          onChange={(e) => { this.setState({ logTime: e.target.value }); }}
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
          onClick={() => {this.closeLogForm();}}
        >
          Cancel
        </button>
        </div>
      ) : (
        <button
          className='show-detail-log'
          type='button'
          onClick={() => {this.showLogForm();}}
        >
          Log work
        </button>
      );

    let logIndex = 0;
    const workLog = (this.props.log) ? 
      this.props.log.map((log) => {
        return (<LogDetail key={log.date.getTime().toString() + logIndex++} log={log} />);
      }) : (null);

    return (
      <div className='task-detail-wrapper'>
        <input
          className='task-detail-title'
          type='text'
          maxLength='70'
          value={this.state.title}
          onChange={(e) => {
            if (e.target.value !== '') {
              const stateObject ={ title: e.target.value };
              this.setState(stateObject);

              if (this.titleTimeout) {
                window.clearTimeout(this.titleTimeout);
              }
              this.titleTimeout = setTimeout(() => this.updateTask(stateObject), 500);
            }
          }} />
        <div className='task-detail-attributes'>
          <div className='task-time'>
            <div className='task-time-img' />
            {timeRating}
          </div>
          <div className='task-effort'>
            <div className='task-effort-img' />
            {effortRating}
          </div>
          <div className='task-focus'>
            <div className='task-focus-img' />
            {focusRating}
          </div>
        </div>

        <div className='task-detail-dates'>
          <div className='task-detail-date'>
            <label className='task-detail-label'>Start date</label>
            <DateInput date={this.state.startDate} submit={
              (date) => { this.setFieldAndSubmit('startDate', date); }
            } />
          </div>
          <div className='task-detail-date'>
            <label className='task-detail-label'>Due date</label>
            <DateInput date={this.state.dueDate} submit={
              (date) => { this.setFieldAndSubmit('dueDate', date); }
            } />
          </div>
        </div>

        <div className='task-detail-notes'>

        </div>

        <div className='task-detail-log'>
          {addLog}
          {workLog}
        </div>
      </div>
    );
  }

  setFieldAndSubmit(field, value) {
    if (value !== this.state[field]) {
      const stateObject = {};
      stateObject[field] = value;

      this.setState(stateObject, () => {
        this.updateTask(stateObject);
      });
    }
  }

  showLogForm() {
    this.setState({ showLogForm: true });
  }

  closeLogForm() {
    this.setState({ showLogForm: false });
  }

  hasChanged() {    
    const propFields = {
      title: this.props.title,
      time: this.props.time,
      effort: this.props.effort,
      focus: this.props.focus,
      category: this.props.category,
      complete: this.props.complete,
      startDate: this.props.startDate,
      dueDate: this.props.dueDate,
    };

    const stateFields = {
      title: this.state.title,
      time: this.state.time,
      effort: this.state.effort,
      focus: this.state.focus,
      category: this.state.category,
      complete: this.state.complete,
      startDate: this.state.startDate,
      dueDate: this.state.dueDate,
    };

    if (JSON.stringify(stateFields) === JSON.stringify(propFields)) {
      this.setState({ dirty: false });
    } else {
      this.setState({ dirty: true });
    }
  }

  updateTask(updateFields) {
    this.props.updateTask(this.props._id, updateFields);
  }

  setLogDate(date) {
    this.setState({logDate: date});
  }

  addWorkLog() {
    const log = {};
    log.date = this.state.logDate;
    log.date.setSeconds(0);
    const logDesc = this.state.logDesc;
    const logTime = this.state.logTime;

    if (logDesc !== undefined && logDesc !== null && logDesc !== '') {
      log.desc = logDesc;
    }

    if (logTime !== undefined && logTime !== null && logTime !== '') {
      log.time = logTime;
    }

    if (log.date && (log.desc || log.time)) {
      this.props.addLog(log);
    }
  }
}

export default TaskDetail;