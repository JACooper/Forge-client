import React from 'react';
import { connect } from 'react-redux';

import TaskForm from '../components/TaskForm.js';
import TaskList from '../components/TaskList.js';
import CategoryList from '../components/CategoryList.js';
import TaskControls from '../components/TaskControls.js';

import * as AuthActions from '../../redux/actions/authActions.js';
import * as CategoryActions from '../../redux/actions/categoryActions.js';
import * as TaskActions from '../../redux/actions/taskActions.js';
import * as ViewActions from '../../redux/actions/viewActions.js';

@connect((store) => {
  return {
    tasks          : store.task.tasks,
    addTaskSuccess : store.task.addTaskSuccess,

    showTaskForm : store.view.showTaskForm,
    sortType     : store.view.sortType,
    sortBy       : store.view.sortBy,
    emphasis     : store.view.emphasis,
    
    activeCategory      : store.category.activeCategory,
    categories          : store.category.categories,
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
    
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.addCategory       = this.addCategory.bind(this);
    this.getCategories     = this.getCategories.bind(this);

    this.changeSortType = this.changeSortType.bind(this);
    this.changeSortBy   = this.changeSortBy.bind(this);
    this.changeEmphasis = this.changeEmphasis.bind(this);
  }

  componentWillMount() {
    if (this.props.addTaskSuccess) {
      this.closeTaskForm();
    }
  }

  render() {
    const taskForm = (this.props.showTaskForm) ? (
      <TaskForm className='task-form' submit={this.submitTask} cancel={this.hideTaskForm} />
    ) : (null);

    return (
      <div>
        <input
          type='button'
          value='Logout'
          onClick={this.logout}
        />
        {taskForm}
        <div className='main-view'>
        <div className='sidebar'>
            <TaskControls
              showTaskForm={this.showTaskForm}
              changeSortType={this.changeSortType}
              changeSortBy={this.changeSortBy}
              changeEmphasis={this.changeEmphasis}
            />
            <CategoryList
              activeCategory={this.props.activeCategory}
              categories={this.props.categories}
              setActiveCategory={this.setActiveCategory}
              addCategory={this.addCategory}
              getCategories={this.getCategories}
            />
          </div>
          <TaskList
            tasks={this.props.tasks}
            updateTasks={this.getTasks}
            activeCategory={this.props.activeCategory}
            sortTypeValue={this.props.sortType}
            sortByValue={this.props.sortBy}
            emphasisValue={this.props.emphasis}
          />
        </div>
      </div>
    );
  }

  logout() {
    this.props.dispatch(AuthActions.logout());
  }

  showTaskForm() {
    this.props.dispatch(ViewActions.showTaskForm());
  }

  hideTaskForm() {
    this.props.dispatch(ViewActions.hideTaskForm());
  }

  setActiveCategory(category) {
    this.props.dispatch(CategoryActions.setActiveCategory(category));
  }

  addCategory(category) {
    this.props.dispatch(CategoryActions.addCategory(category));
  }

  getCategories() {
    this.props.dispatch(CategoryActions.getCategories());
  }

  submitTask(taskParams) {
    const category = (this.props.activeCategory) ? this.props.activeCategory : 'Uncategorized';
    this.props.dispatch(TaskActions.addTask({...taskParams, category}));
  }

  getTasks() {
    this.props.dispatch(TaskActions.getTasks());
  }

  changeSortType(sortType) {
    this.props.dispatch(ViewActions.changeSortType(sortType));
  }

  changeSortBy(sortBy) {
    this.props.dispatch(ViewActions.changeSortBy(sortBy));
  }

  changeEmphasis(emphasis) {
    this.props.dispatch(ViewActions.changeEmphasis(emphasis));
  }
}

export default App;