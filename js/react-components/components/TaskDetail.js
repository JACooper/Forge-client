import React from 'react';
import DateInput from './dateinput/DateInput.js';
import LogDetail from './LogDetail.js';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.setStartDate = this.setStartDate.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.restrictInput = this.restrictInput.bind(this);
    this.addWorkLog = this.addWorkLog.bind(this);

    // Only use task props for initial state - subsequent form data should come from user input
    this.state = {
      title: this.props.task.title,
      time: this.props.task.time,
      effort: this.props.task.effort,
      focus: this.props.task.focus,
      category: this.props.task.category,
      startDate: this.props.task.startDate,
      dueDate: this.props.task.dueDate,
      complete: this.props.task.complete,
      logDate: new Date(),
      logDesc: '',
      logTime: '',
      dirty: false,
    };
  }

  render() {
    let time = '';
    let effort = '';
    let focus = '';

    for (let stars = 1; stars <= 3; stars++) {
      if (stars <= this.state.time) {
        time += '\u2605';
      } else {
        time += '\u2606';
      }

      if (stars <= this.state.effort) {
        effort += '\u2605';
      } else {
        effort += '\u2606';
      }

      if (stars <= this.state.focus) {
        focus += '\u2605';
      } else {
        focus += '\u2606';
      }
    }

    const categoryOptions = this.props.categories.map((category) => {
      return (<option key={category._id} className='category-option' value={category._id}>
          {category.name}
        </option>);
    });

    let logIndex = 0;
    const workLog = (this.props.task.log) ? 
      this.props.task.log.map((log) => {
        return (<LogDetail key={log.date.getTime().toString() + logIndex++} log={log} />);
      }) : (null);

    const toggleButtonClass = (this.state.complete) ? 'mark-uncomplete-button' : 'mark-complete-button';
    let updateClasses = 'task-detail-update';
    if (!this.state.dirty || this.props.updatingTask){
      updateClasses += ' update-disabled';
    }

    return (
      <div className='task-detail-wrapper'>
        <input
          className='task-detail-title'
          type='text'
          value={this.state.title}
          onChange={(e) => {
            this.setState({title: e.target.value});
            setTimeout(() => {this.hasChanged();}, 500);
          }}
        />
        <p className='task-detail-time'>Time: {time}</p>
        <p className='task-detail-effort'>Effort: {effort}</p>
        <p className='task-detail-focus'>Focus: {focus}</p>

        <label className='task-detail-label'>Start date</label>
        <DateInput date={this.state.startDate} submit={this.setStartDate} />
        <label className='task-detail-label'>Due date</label>
        <DateInput date={this.state.dueDate} submit={this.setDueDate} />

        <select
          className='category-dropdown'
          value={this.state.category._id}
          onChange={(e) => {
            this.setState({category: e.target.value});
            setTimeout(() => {this.hasChanged();}, 500);
          }}
        >
          {categoryOptions}
        </select>
        
        <button
          className={toggleButtonClass}
          type='button'
          onClick={() => {
            this.setState({complete: !this.state.complete});
            setTimeout(() => {this.hasChanged();}, 500);
          }}
        >
          &#10004;
        </button>

        <button
          className={updateClasses}
          type='button'
          disabled={!this.state.dirty}
          onClick={this.updateTask}
        >
          Update task
        </button>

        <DateInput date={this.state.logDate} submit={this.setLogDate} />
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

        {workLog}

        <button
          className='close-detail-view'
          type='button'
          onClick={() => {this.props.closeDetail();}}
        >
          &times;
        </button>
      </div>
    );
  }

  setStartDate(date) {
    this.setState({startDate: date});
    setTimeout(() => {this.hasChanged();}, 500);
  }

  setDueDate(date) {
    this.setState({dueDate: date});
    setTimeout(() => {this.hasChanged();}, 500);
  }

  hasChanged() {    
    const propFields = {
      title: this.props.task.title,
      time: this.props.task.time,
      effort: this.props.task.effort,
      focus: this.props.task.focus,
      category: this.props.task.category,
      complete: this.props.task.complete,
      startDate: this.props.task.startDate,
      dueDate: this.props.task.dueDate,
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

  updateTask() {
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

    // Send in the original task, plus whatever fields were edited
    this.props.updateTask({...this.props.task, ...stateFields});
  }

  restrictInput(event) {
    if (event.key !== undefined)  {
      const key = event.key;

      if (key !== 'ArrowLeft'
          && key !== 'ArrowRight'
          && key !== 'Backspace'
          && key !== 'Delete'
          && key !== 'Tab'
          && key !== '.'
          && key !== '0'
          && key !== '1'
          && key !== '2'
          && key !== '3'
          && key !== '4'
          && key !== '5'
          && key !== '6'
          && key !== '7'
          && key !== '8'
          && key !== '9') {
        event.preventDefault();
        return false;
      }
    } else if (event.keyCode !== undefined) {
      const key = event.keyCode;
      if (!(key >= 48 && key <= 57) 
          && (key !== 8 && key !== 46 && key !== 37 && key !== 39 && key !== 9 && key !== 190)) {
        event.preventDefault();
        return false;
      }
    }
  }

  setLogDate(date) {
    this.setState({logDate: date});
  }

  addWorkLog() {
    const log = {};
    log.date = this.state.logDate;
    const logDesc = this.state.logDesc;
    const logTime = this.state.logTime;

    if (logDesc !== null && logDesc !== undefined && logDesc !== '') {
      log.desc = logDesc;
    }

    if (logTime !== null && logTime !== undefined && logTime !== '') {
      log.time = logTime;
    }

    if (log.date && (log.desc || log.time)) {
      this.props.addLog({ ...log });
    }
  }
}

export default TaskDetail;