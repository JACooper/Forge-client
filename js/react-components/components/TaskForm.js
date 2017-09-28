import React from 'react';

import DateInput from './dateinput/DateInput.js';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {
      title: '',
      time: 1,
      effort: 1,
      focus: 1,
      startDate: null,
      dueDate: null,
    };
  }

  render() {
    return (
      <div className='task-form-wrapper'>
        <input
          className='task-form-title'
          type='text'
          value={this.state.title}
          placeholder='Enter a new task'
          onChange={(e) => {this.setState({title: e.target.value});}}
        />
        <label>Time rating: </label>
        <input
          className='task-form-time'
          type='number'
          value={this.state.time}
          min='1'
          max='3'
          onChange={(e) => {this.setState({time: e.target.value});}}
        />
        <label>Effort rating: </label>
        <input
          className='task-form-effort'
          type='number'
          value={this.state.effort}
          min='1'
          max='3'
          onChange={(e) => {this.setState({effort: e.target.value});}}
        />
        <label>Focus rating: </label>
        <input
          className='task-form-focus'
          type='number'
          value={this.state.focus}
          min='1'
          max='3'
          onChange={(e) => {this.setState({focus: e.target.value});}}
        />

        <label id='start-date-label'>Start Date (optional):</label>
        <DateInput
          date={this.state.startDate}
          submit={(startDate) => {this.setState({ startDate });}} />

        <label id='due-date-label'>Due Date (optional):</label>
        <DateInput
          date={this.state.dueDate}
          submit={(dueDate) => {this.setState({ dueDate });}} />

        <input type='button' value='Submit task' onClick={this.submit}/>
        <input type='button' value='Cancel' onClick={this.props.cancel}/>
      </div>
    );
  }

  submit() {
    const task = {
      title: this.state.title,
      time: this.state.time,
      effort: this.state.effort,
      focus: this.state.focus,
    };

    if (this.state.startDate !== null) {
      task.startDate = this.state.startDate;
    }

    if (this.state.dueDate !== null) {
      task.dueDate = this.state.dueDate;
    }

    if (task.title
        && task.time
        && task.effort
        && task.focus) {
      this.props.submit(task);
    }
  }
}

export default TaskForm;