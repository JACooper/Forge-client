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
    this.props.update();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.shouldUpdate
        && !(this.props.shouldUpdate == newProps.shouldUpdate)) {
      this.props.update();
    }
  }

  render() {
    const sortedTasks = this.props.tasks;

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
      return <Task {...task} key={task._id} />
    });

    return (
      <div className='task-list-wrapper'>
        <div className='list-sort-controls'>
          <label>Sort type:</label>
          <select
            value={this.props.sortTypeValue}
            onChange={(e) => {this.props.changeSortType(e.target.value)}}
          >
            <option value='ascending'>Ascending</option>
            <option value='descending'>Descending</option>
          </select>

          <label>Sort by:</label>
          <select
            value={this.props.sortByValue}
            onChange={(e) => {this.props.changeSortBy(e.target.value)}}
          >
            <option value='sum'>Sum</option>
            <option value='time'>Time</option>
            <option value='effort'>Effort</option>
            <option value='focus'>Focus</option>
          </select>
        </div>
        {tasks}
      </div>
    );
  }

  sortSum(task1, task2) {
    const sum1 = task1.time + task1.effort + task1.focus;
    const sum2 = task2.time + task2.effort + task2.focus;

    return sum1 - sum2;
  }

  sortTime(task1, task2) {
    return task1.time - task2.time;
  }

  sortEffort(task1, task2) {
    return task1.effort - task2.effort;
  }
  
  sortFocus(task1, task2) {
    return task1.focus - task2.focus;
  }
  
}

export default TaskList;