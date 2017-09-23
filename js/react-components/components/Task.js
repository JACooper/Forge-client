import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='task-wrapper'>
        <p className='task-title'>{this.props.title}</p>
        <p className='task-time'>{this.props.time}</p>
        <p className='task-effort'>{this.props.effort}</p>
        <p className='task-focus'>{this.props.focus}</p>
        <button
          type='button'
          className='mark-complete-button'
          onClick={() => {this.props.markComplete(this.props._id);}}
        />
      </div>
    );
  }
}

export default Task;