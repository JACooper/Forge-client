import React from 'react';
import { connect } from 'react-redux';

import Task from '../components/Task.js';
import * as TaskActions from '../../redux/actions/taskActions.js';

@connect((store) => {
  return {
    tasks: store.task.tasks,
  }
})
class App extends React.Component {
  constructor(props) {
    super();

    this.submitTask = this.submitTask.bind(this);

    this.state = {
      taskTitle: '',
    }
  }

  render() {
    const tasks = this.props.tasks.map((task) => {
      return <Task {...task} />
    })

    return (
      <div>
        <input
          type='text'
          value={this.state.taskTitle}
          placeholder='Enter a new task'
          onChange={(e) => {this.setState({taskTitle: e.target.value})}}
        />
        <input type='button' value='Submit task' onClick={this.submitTask}/>
        {tasks}
      </div>
    );
  }

  submitTask() {
    if (this.state.taskTitle !== '') {
      this.props.dispatch(TaskActions.addTask({title: this.state.taskTitle}));
    }
  }
}

export default App;