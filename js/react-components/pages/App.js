import React from 'react';
import { connect } from 'react-redux';

import Task from '../components/Task.js';
import TaskList from '../components/TaskList.js';
import * as TaskActions from '../../redux/actions/taskActions.js';
import * as AuthActions from '../../redux/actions/authActions.js';

@connect((store) => {
  return {
    tasks: store.task.tasks,
    shouldGetTasks: store.task.shouldGetTasks,
  };
})
class App extends React.Component {
  constructor(props) {
    super();

    this.submitTask = this.submitTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      taskTitle: '',
    }
  }

  render() {
    return (
      <div>
        <input
          type='button'
          value='Logout'
          onClick={this.logout}
        />
        <input
          type='text'
          value={this.state.taskTitle}
          placeholder='Enter a new task'
          onChange={(e) => {this.setState({taskTitle: e.target.value})}}
        />
        <input type='button' value='Submit task' onClick={this.submitTask}/>
        <TaskList
          tasks={this.props.tasks}
          update={this.getTasks}
          shouldUpdate={this.props.shouldGetTasks}
        />
      </div>
    );
  }

  submitTask() {
    if (this.state.taskTitle !== '') {
      this.props.dispatch(TaskActions.addTask({title: this.state.taskTitle}));
    }
  }

  getTasks() {
    this.props.dispatch(TaskActions.getTasks());
  }

  logout() {
    this.props.dispatch(AuthActions.logout());
  }
}

export default App;