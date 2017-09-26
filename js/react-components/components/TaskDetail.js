import React from 'react';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const categoryOptions = this.props.categories.map((category) => {
      return (<option key={category._id} className='category-option' value={category._id}>
          {category.name}
        </option>);
    });

    const toggleButtonClass = (this.props.complete) ? 'mark-uncomplete-button' : 'mark-complete-button';

    return (
      <div className='task-detail-wrapper'>
        <p className='task-detail-title'>{this.props.title}</p>
        <p className='task-detail-time'>{this.props.time}</p>
        <p className='task-detail-effort'>{this.props.effort}</p>
        <p className='task-detail-focus'>{this.props.focus}</p>

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