import React from 'react';
import Task from './Task.js';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.sortSum     = this.sortSum.bind(this);
    this.sortTime    = this.sortTime.bind(this);
    this.sortEffort  = this.sortEffort.bind(this);
    this.sortFocus   = this.sortFocus.bind(this);
  }

  componentWillMount() {
    this.props.updateTasks();
  }

  render() {
    // Use only tasks in activeCategory, or all tasks if activeCategory is unspecified
    let sortedTasks = (this.props.activeCategory) ?
      (this.props.tasks.filter((task) => {
        return task.category.name === this.props.activeCategory;
      })) : (this.props.tasks);

    if (!(this.props.showComplete)) {
      sortedTasks = sortedTasks.filter((task) => {
        return (!task.complete);
      });
    }

    switch(this.props.sortByValue) {
    case 'sum':
      sortedTasks.sort(this.sortSum);
      break;
    case 'time':
      sortedTasks.sort(this.sortTime);
      break;
    case 'effort':
      sortedTasks.sort(this.sortEffort);
      break;
    case 'focus':
      sortedTasks.sort(this.sortFocus);
      break;
    }

    /*
      Could have supplied an extra 4 sort functions for ascending/descending sort order
      and put branching logic in each case above to avoid reversing here. Could also
      provide a single custom sort function that takes the sortByValue and sortByType as
      parameters. Went with this to keep logic controlled and readable.
    */
    if (this.props.sortTypeValue === 'descending') {
      sortedTasks.reverse();
    }

    const tasks = sortedTasks.map((task) => {
      return <Task {...task} key={task._id} toggleComplete={this.props.toggleComplete} />;
    });

    return (
      <div className='task-list-wrapper'>
        
        <div className='task-list'>
          {tasks}
        </div>
      </div>
    );
  }

  sortSum(task1, task2) {
    let sum1 = task1.time + task1.effort + task1.focus;
    let sum2 = task2.time + task2.effort + task2.focus;

    switch (this.props.emphasis) {
    case 'time':
      sum1 += task1.time;
      sum2 += task2.time;
      break;
    case 'effort':
      sum1 += task1.effort;
      sum2 += task2.effort;
      break;
    case 'focus':
      sum1 += task1.focus;
      sum2 += task2.focus;
      break;
    }

    return sum1 - sum2;
  }

  sortTime(task1, task2) {
    if (this.props.emphasis === 'time') {
      return task1.time * 2 - task2.time * 2;
    }
    return task1.time - task2.time;
  }

  sortEffort(task1, task2) {
    if (this.props.emphasis === 'effort') {
      return task1.effort * 2 - task2.effort * 2;
    }
    return task1.effort - task2.effort;
  }
  
  sortFocus(task1, task2) {
    if (this.props.emphasis === 'focus') {
      return task1.focus * 2 - task2.focus * 2;
    }
    return task1.focus - task2.focus;
  }
  
}

export default TaskList;