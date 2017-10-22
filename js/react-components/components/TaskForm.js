import React from 'react';

import DateInput from './dateinput/DateInput.js';
import Rating from './Rating.js';

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
          maxLength="50"
          placeholder='New task'
          onChange={(e) => {this.setState({title: e.target.value});}}
        />
        
        <div className='task-form-attributes'>
          <div className='task-form-attribute'>
            <label>Time</label>
            <div className='task-form-rating'>
              <div className='task-form-time-img'/>
              <Rating rating={1} setRating={(stars) => {this.setState({time: stars});}} />
            </div>
          </div>

          <div className='task-form-attribute'>
            <label>Effort</label>
            <div className='task-form-rating'>              
              <div className='task-form-effort-img'/>
              <Rating rating={1} setRating={(stars) => {this.setState({effort: stars});}} />
            </div>
          </div>

          <div className='task-form-attribute'>
            <label>Focus</label>
            <div className='task-form-rating'>
              <div className='task-form-focus-img'/>
              <Rating rating={1} setRating={(stars) => {this.setState({focus: stars});}} />
            </div>
          </div>
        </div>

        <div className='task-form-dates'>
          <div className='task-form-date'>
            <label>Start Date (optional):</label>
            <DateInput
              date={this.state.startDate}
              submit={(startDate) => {this.setState({ startDate });}} />
          </div>

          <div className='task-form-date'>
            <label>Due Date (optional):</label>
            <DateInput
              date={this.state.dueDate}
              submit={(dueDate) => {this.setState({ dueDate });}} />
          </div>
        </div>

        <div className='task-form-controls'>
          <button className='task-form-cancel' type='button' onClick={this.props.cancel}>
            Cancel
          </button>
          <button className='task-form-submit' type='button' onClick={this.submit}>
            Submit
          </button>
        </div>
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