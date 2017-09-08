import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    <div className='task-wrapper'>
      <p className='task-title'>{this.props.title}</p>
    </div>
  }
}

export default Task;