import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const timeRating = [];
    const effortRating = [];
    const focusRating = [];

    for (let stars = 1; stars <= 3; stars++) {
      if (stars <= this.props.time) {
        timeRating.push(<div className='task-rating-full' key={stars} />);
      } else {
        timeRating.push(<div className='task-rating-empty' key={stars} />);
      }

      if (stars <= this.props.effort) {
        effortRating.push(<div className='task-rating-full' key={stars} />);
      } else {
        effortRating.push(<div className='task-rating-empty' key={stars} />);
      }

      if (stars <= this.props.focus) {
        focusRating.push(<div className='task-rating-full' key={stars} />);
      } else {
        focusRating.push(<div className='task-rating-empty' key={stars} />);
      }
    }

    const toggleButtonClass = (this.props.complete) ? 'task-toggle-complete' : 'task-toggle-uncomplete';

    return (
      <div className='task-wrapper' onClick={() => {this.props.openDetail(this.props._id);}}>
        <div className='task-header-bar'>
          <p className='task-title'>{this.props.title}</p>
          <button
            className={toggleButtonClass}
            type='button'
            onClick={(e) => {
              this.props.toggleComplete(this.props._id);
              e.stopPropagation();
            }}
          />
        </div>

        <div className='task-time'>
          <div className='task-time-img' />
          {timeRating}
        </div>
        <div className='task-effort'>
          <div className='task-effort-img' />
          {effortRating}
        </div>
        <div className='task-focus'>
          <div className='task-focus-img' />
          {focusRating}
        </div>
      </div>
    );
  }
}

export default Task;