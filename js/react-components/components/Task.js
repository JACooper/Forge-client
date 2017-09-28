import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let time = '';
    let effort = '';
    let focus = '';

    for (let stars = 1; stars <= 3; stars++) {
      if (stars <= this.props.time) {
        time += '\u2605';
      } else {
        time += '\u2606';
      }

      if (stars <= this.props.effort) {
        effort += '\u2605';
      } else {
        effort += '\u2606';
      }

      if (stars <= this.props.focus) {
        focus += '\u2605';
      } else {
        focus += '\u2606';
      }
    }

    const startDate = (this.props.startDate) ? (
        <p className='task-start'>Start Date: {this.props.startDate.toDateString()}</p>
      ) : ( null);

    const dueDate = (this.props.dueDate) ? (
        <p className='task-due'>Due Date: {this.props.dueDate.toDateString()}</p>
      ) : ( null);

    return (
      <div className='task-wrapper' onClick={() => {this.props.openDetail(this.props._id);}}>
        <p className='task-title'>{this.props.title}</p>
        <p className='task-time'>Time: {time}</p>
        <p className='task-effort'>Effort: {effort}</p>
        <p className='task-focus'>Focus: {focus}</p>
        {startDate}
        {dueDate}
      </div>
    );
  }
}

export default Task;