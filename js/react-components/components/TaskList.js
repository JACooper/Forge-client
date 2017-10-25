import React from 'react';
import Task from './Task.js';
import TaskDetail from './TaskDetail.js';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.sortSum = this.sortSum.bind(this);
    this.sortTime = this.sortTime.bind(this);
    this.sortEffort = this.sortEffort.bind(this);
    this.sortFocus = this.sortFocus.bind(this);
    this.sortStart = this.sortStart.bind(this);
    this.sortDue = this.sortDue.bind(this);
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

    // For stable sorting in case of equal sums, etc.
    for(let i = 0; i < sortedTasks.length; i++) {
      sortedTasks[i].position = i;
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
    case 'start':
      sortedTasks.sort(this.sortStart);
      break;
    case 'due':
      sortedTasks.sort(this.sortDue);
      break;
    }

    if (this.props.sortByValue !== 'start' 
      && this.props.sortByValue !== 'due' 
      && this.props.sortTypeValue === 'descending') {
      sortedTasks.reverse();
    }

    const tasks = sortedTasks.map((task) => {
      if (task._id === this.props.detailView) {
        return <TaskDetail
            {...task}
            key={task._id}
            categories={this.props.categories}
            updatingTask={this.props.updatingTask}
            closeDetail={this.props.closeDetail}
            updateTask={this.props.updateTask}
            addLog={this.props.addLog}
            updateTaskSuccess={this.props.updateTaskSuccess}
            addLogSuccess={this.props.addLogSuccess}
          />;
      } else {
        return <Task
            {...task}
            key={task._id}
            openDetail={this.props.openDetail}
            toggleComplete={this.props.toggleComplete}
          />;
      }
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

    if (sum1 === sum2) {
      return task1.position - task2.position;
    }
    return sum1 - sum2;
  }

  sortTime(task1, task2) {
    if (task1.time === task2.time) {
      return task1.position - task2.position;
    }
    return task1.time - task2.time;
  }

  sortEffort(task1, task2) {
    if (task1.effort === task2.effort) {
      return task1.position - task2.position;
    }
    return task1.effort - task2.effort;
  }
  
  sortFocus(task1, task2) {
    if (task1.focus === task2.focus) {
      return task1.position - task2.position;
    }
    return task1.focus - task2.focus;
  }
  
  sortStart(task1, task2) {
    if (task1.startDate !== null && task2.startDate !== null) {
      const start1 = task1.startDate.getTime();
      const start2 = task2.startDate.getTime();

      if (start1 === start2) {
        return this.sortSum(task1, task2);
      } else {
        const modifier = (this.props.sortTypeValue === 'descending') ? -1 : 1;
        return (start1 - start2) * modifier;
      }
    } else if (task1.startDate && task2.startDate === null) {
      return -1;  // tasks with dates are sorted above tasks without
    } else if (task1.startDate === null && task2.startDate) {
      return 1;
    } else {
      return this.sortSum(task1, task2);
    }
  }

  sortDue(task1, task2) {
    if (task1.dueDate !== null && task2.dueDate !== null) {
      const due1 = task1.dueDate.getTime();
      const due2 = task2.dueDate.getTime();

      if (due1 === due2) {
        return this.sortSum(task1, task2);
      } else {
        const modifier = (this.props.sortTypeValue === 'descending') ? -1 : 1;
        return (due1 - due2) * modifier;
      }
    } else if (task1.dueDate && task2.dueDate === null) {
      return -1;  // tasks with dates are sorted above tasks without
    } else if (task1.dueDate === null && task2.dueDate) {
      return 1;
    } else {
      return this.sortSum(task1, task2);
    }
  }
}

export default TaskList;