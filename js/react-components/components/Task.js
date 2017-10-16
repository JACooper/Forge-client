import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let time = '';
    // let effort = '';
    // let focus = '';

    // for (let stars = 1; stars <= 3; stars++) {
    //   if (stars <= this.props.time) {
    //     time += '\u2605';
    //   } else {
    //     time += '\u2606';
    //   }

    //   if (stars <= this.props.effort) {
    //     effort += '\u2605';
    //   } else {
    //     effort += '\u2606';
    //   }

    //   if (stars <= this.props.focus) {
    //     focus += '\u2605';
    //   } else {
    //     focus += '\u2606';
    //   }
    // }

    // let timeClass;
    // switch (this.props.time) {
    // case 1:
    //   timeClass = 'task-img task-rating one-star';
    //   break;
    // case 2:
    //   timeClass = 'task-img task-rating two-stars';
    //   break;
    // case 3:
    //   timeClass = 'task-img task-rating three-stars';
    // }

    // let effortClass;
    // switch (this.props.effort) {
    // case 1:
    //   effortClass = 'task-img task-rating one-star';
    //   break;
    // case 2:
    //   effortClass = 'task-img task-rating two-stars';
    //   break;
    // case 3:
    //   effortClass = 'task-img task-rating three-stars';
    // }

    // let focusClass;
    // switch (this.props.focus) {
    // case 1:
    //   focusClass = 'task-img task-rating one-star';
    //   break;
    // case 2:
    //   focusClass = 'task-img task-rating two-stars';
    //   break;
    // case 3:
    //   focusClass = 'task-img task-rating three-stars';
    // }

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

    return (
      <div className='task-wrapper' onClick={() => {this.props.openDetail(this.props._id);}}>
        <p className='task-title'>{this.props.title}</p>
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