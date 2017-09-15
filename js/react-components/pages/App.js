import React from 'react';
import { connect } from 'react-redux';

import Task from '../components/Task.js';
import TaskForm from '../components/TaskForm.js';
import TaskList from '../components/TaskList.js';

import * as AuthActions from '../../redux/actions/authActions.js';
import * as TaskActions from '../../redux/actions/taskActions.js';
import * as ViewActions from '../../redux/actions/viewActions.js';

@connect((store) => {
  return {
    tasks: store.task.tasks,
    shouldGetTasks: store.task.shouldGetTasks,
    addTaskSuccess: store.task.addTaskSuccess,
    showTaskForm: store.view.showTaskForm,
    sortType: store.view.sortType,
    sortBy: store.view.sortBy,
  };
})
class App extends React.Component {
  constructor(props) {
    super(props);

    this.showTaskForm   = this.showTaskForm.bind(this);
    this.hideTaskForm   = this.hideTaskForm.bind(this);
    this.submitTask     = this.submitTask.bind(this);
    this.getTasks       = this.getTasks.bind(this);
    this.logout         = this.logout.bind(this);
    this.changeSortType = this.changeSortType.bind(this);
    this.changeSortBy   = this.changeSortBy.bind(this);
  }

  componentWillMount() {
    if (this.props.addTaskSuccess) {
      this.closeTaskForm();
    }
  }

  render() {
    const taskForm = (this.props.showTaskForm) ? (
      <TaskForm submit={this.submitTask} cancel={this.hideTaskForm}/>
    ) : (null);

    const showFormButton = !(this.props.showTaskForm) ? (
      <input type='button' value='Create task' onClick={this.showTaskForm}/>
    ) : (null);

    return (
      <div>
        <input
          type='button'
          value='Logout'
          onClick={this.logout}
        />
        {showFormButton}
        {taskForm}
        <TaskList
          tasks={this.props.tasks}
          update={this.getTasks}
          shouldUpdate={this.props.shouldGetTasks}
          changeSortType={this.changeSortType}
          changeSortBy={this.changeSortBy}
          sortTypeValue={this.props.sortType}
          sortByValue={this.props.sortBy}
        />
      </div>
    );
  }

  showTaskForm() {
    this.props.dispatch(ViewActions.showTaskForm());
  }

  hideTaskForm() {
    this.props.dispatch(ViewActions.hideTaskForm());
  }

  submitTask(taskParams) {
    this.props.dispatch(TaskActions.addTask(taskParams));
  }

  getTasks() {
    this.props.dispatch(TaskActions.getTasks());
  }

  logout() {
    this.props.dispatch(AuthActions.logout());
  }

  changeSortType(sortType) {
    this.props.dispatch(ViewActions.changeSortType(sortType));
  }

  changeSortBy(sortBy) {
    this.props.dispatch(ViewActions.changeSortBy(sortBy));
  }
}

export default App;