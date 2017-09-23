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
    showComplete : store.view.showComplete,
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
    this.toggleComplete   = this.toggleComplete.bind(this);
    this.submitTask     = this.submitTask.bind(this);
    this.getTasks       = this.getTasks.bind(this);
    this.markComplete   = this.markComplete.bind(this);
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
              showComplete   ={this.props.showComplete}
              showTaskForm   ={this.showTaskForm}
              toggleComplete ={this.toggleComplete}
              changeSortType ={this.changeSortType}
              changeSortBy   ={this.changeSortBy}
              changeEmphasis ={this.changeEmphasis}
            />
            <CategoryList
              activeCategory    ={this.props.activeCategory}
              categories        ={this.props.categories}
              setActiveCategory ={this.setActiveCategory}
              addCategory       ={this.addCategory}
              getCategories     ={this.getCategories}
            />
          </div>
          <TaskList
            tasks          ={this.props.tasks}
            showComplete   ={this.props.showComplete}
            activeCategory ={this.props.activeCategory}
            sortTypeValue  ={this.props.sortType}
            sortByValue    ={this.props.sortBy}
            emphasisValue  ={this.props.emphasis}
            updateTasks    ={this.getTasks}
            markComplete   ={this.markComplete}
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

  toggleComplete() {
    this.props.dispatch(ViewActions.toggleComplete());
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
    const category = (this.props.activeCategory) ?
      this.props.categories.find((category) => {
        return category.name = this.props.activeCategory;
      })
      : this.props.categories.find((category) => {
        return category.name = 'Uncategorized';
      });
    this.props.dispatch(TaskActions.addTask({...taskParams, categoryID: category._id}));
  }

  getTasks() {
    this.props.dispatch(TaskActions.getTasks());
  }

  markComplete(taskID) {
    this.props.dispatch(TaskActions.markComplete(taskID));
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