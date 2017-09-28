import React from 'react';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let time = '';
    let effort = '';
    let focus = '';

    for (let stars = 1; stars <= 3; stars++) {
      if (stars <= this.props.time) {
        time += '\u2605';
      } else {
        time += '\u2606';
      }

      if (stars <= this.props.effort) {
        effort += '\u2605';
      } else {
        effort += '\u2606';
      }

      if (stars <= this.props.focus) {
        focus += '\u2605';
      } else {
        focus += '\u2606';
      }
    }

    const startDate = (this.props.startDate) ? (
        <p className='task-detail-start'>Start Date: {this.props.startDate.toDateString()}</p>
      ) : ( null);

    const dueDate = (this.props.dueDate) ? (
        <p className='task-detail-due'>Due Date: {this.props.dueDate.toDateString()}</p>
      ) : ( null);

    const categoryOptions = this.props.categories.map((category) => {
      return (<option key={category._id} className='category-option' value={category._id}>
          {category.name}
        </option>);
    });

    const toggleButtonClass = (this.props.complete) ? 'mark-uncomplete-button' : 'mark-complete-button';

    return (
      <div className='task-detail-wrapper'>
        <p className='task-detail-title'>{this.props.title}</p>
        <p className='task-detail-time'>Time: {time}</p>
        <p className='task-detail-effort'>Effort: {effort}</p>
        <p className='task-detail-focus'>Focus: {focus}</p>
        {startDate}
        {dueDate}

        <select
          className='category-dropdown'
          value={this.props.category._id}
          onChange={(e) => {
            this.props.changeCategory(this.props._id, e.target.value);
          }}>
          {categoryOptions}
        </select>
        
        <button
          type='button'
          className={toggleButtonClass}
          onClick={() => {this.props.toggleComplete(this.props._id, this.props.complete);}}
        >
          &#10004;
        </button>

        <button
          type='button'
          className='close-detail-view'
          onClick={() => {this.props.closeDetail();}}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default TaskDetail;