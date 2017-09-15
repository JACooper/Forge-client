import React from 'react';
import Task from './Task.js';

class TaskList extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.props.update();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.shouldUpdate
        && !(this.props.shouldUpdate == newProps.shouldUpdate)) {
      this.props.update();
    }
  }

  render() {
    const tasks = this.props.tasks.map((task) => {
      return <Task {...task} key={task._id} />
    });

    return (
      <div className='task-list-wrapper'>
        {tasks}
      </div>
    );
  }
}

export default TaskList;