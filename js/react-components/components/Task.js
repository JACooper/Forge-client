import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const toggleButtonClass = (this.props.complete) ? 'mark-uncomplete-button' : 'mark-complete-button';

    return (
      <div className='task-wrapper'>
        <p className='task-title'>{this.props.title}</p>
        <p className='task-time'>{this.props.time}</p>
        <p className='task-effort'>{this.props.effort}</p>
        <p className='task-focus'>{this.props.focus}</p>
        <button
          type='button'
          className={toggleButtonClass}
          onClick={() => {this.props.toggleComplete(this.props._id, this.props.complete);}}
        />
      </div>
    );
  }
}

export default Task;