import React from 'react';
import DateInput from './dateinput/DateInput.js';
import LogDetail from './LogDetail.js';
import LogForm from './LogForm.js';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.updateTask = this.updateTask.bind(this);
    this.showLogForm = this.showLogForm.bind(this);
    this.closeLogForm = this.closeLogForm.bind(this);

    let showLogDefault = false;
    if (this.props.log && this.props.log.length < 4) {
      showLogDefault = true;
    }

    // Only use task props for initial state - subsequent form data should come from user input
    this.state = {
      title: this.props.title,
      time: this.props.time,
      effort: this.props.effort,
      focus: this.props.focus,
      category: this.props.category,
      startDate: this.props.startDate,
      dueDate: this.props.dueDate,
      complete: this.props.complete,
      showLog: showLogDefault,
      showLogForm: false,
      dirty: false,
    };
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.updateTaskSuccess !== this.props.updateTaskSuccess && newProps.updateTaskSuccess) {
  //     this.props.closeDetail();
  //   }
  // }

  render() {
    const timeRating = [];
    const effortRating = [];
    const focusRating = [];

    for (let stars = 1; stars <= 3; stars++) {
      if (stars <= this.props.time) {
        timeRating.push(<div className='task-detail-rating-full' key={stars} />);
      } else {
        timeRating.push(<div className='task-detail-rating-empty' key={stars} />);
      }

      if (stars <= this.props.effort) {
        effortRating.push(<div className='task-detail-rating-full' key={stars} />);
      } else {
        effortRating.push(<div className='task-detail-rating-empty' key={stars} />);
      }

      if (stars <= this.props.focus) {
        focusRating.push(<div className='task-detail-rating-full' key={stars} />);
      } else {
        focusRating.push(<div className='task-detail-rating-empty' key={stars} />);
      }
    }

    const categoryOptions = this.props.categories.map((category) => {
      return (<option key={category._id} className='category-option' value={category._id}>
          {category.name}
        </option>);
    });

    const showFormButton = (this.state.showLog) ? (
      <button
          className='show-log-form'
          type='button'
          onClick={() => {this.showLogForm();}}
        />
      ) : (null);

    const logForm = (this.state.showLogForm) ? (
        <div className='log-form-modal-wrapper'>
          <div className='lightbox-dim' />
          <LogForm
            addLogSuccess={this.props.addLogSuccess}
            addLog={this.props.addLog}
            closeLogForm={this.closeLogForm}
          />
        </div>
      ) : (null);

    // Should sort logs by date
    let logIndex = 0;
    const workLog = (this.state.showLog && this.props.log) ? 
      this.props.log.map((log) => {
        return (<LogDetail key={log.date.getTime().toString() + logIndex++} log={log} />);
      }) : (null);

    const logContainer = (this.state.showLog) ? (
        <div className='task-detail-log'>
          {workLog}
        </div>
      ) : (null);

    return (
      <div className='task-detail-wrapper'>
        <input
          className='task-detail-title'
          type='text'
          maxLength='70'
          value={this.state.title}
          onChange={(e) => {
            if (e.target.value !== '') {
              const stateObject ={ title: e.target.value };
              this.setState(stateObject);

              if (this.titleTimeout) {
                window.clearTimeout(this.titleTimeout);
              }
              this.titleTimeout = setTimeout(() => this.updateTask(stateObject), 500);
            }
          }} />
        <div className='task-detail-attributes'>
          <div className='task-detail-attribute'>
            <label className='task-detail-attribute-label'>Time</label>
            <div className='task-detail-attribute-rating'>
              <div className='task-detail-time-img' />
              {timeRating}
            </div>
          </div>
          <div className='task-detail-attribute'>
            <label className='task-detail-attribute-label'>Effort</label>
            <div className='task-detail-attribute-rating'>
              <div className='task-detail-effort-img' />
              {effortRating}
            </div>
          </div>
          <div className='task-detail-attribute'>
            <label className='task-detail-attribute-label'>Focus</label>
            <div className='task-detail-attribute-rating'>
              <div className='task-detail-focus-img' />
              {focusRating}
            </div>
          </div>
        </div>

        <div className='task-detail-dates'>
          <div className='task-detail-date'>
            <label className='task-detail-label'>Start date</label>
            <DateInput date={this.state.startDate} submit={
              (date) => { this.setFieldAndSubmit('startDate', date); }
            } />
          </div>
          <div className='task-detail-date'>
            <label className='task-detail-label'>Due date</label>
            <DateInput date={this.state.dueDate} submit={
              (date) => { this.setFieldAndSubmit('dueDate', date); }
            } />
          </div>
        </div>

        <div className='task-detail-category'>
          <label className='task-detail-category-label'>Category</label>
          <select
            className='task-detail-category-dropdown'
            value={this.state.category._id}
            onChange={(e) => {
              this.setState({category: e.target.value});
            }}
          >
            {categoryOptions}
          </select>
        </div>

        <div className='task-detail-submit-controls'>
          <button
            className='task-detail-cancel'
            type='button'
            onClick={() => {this.props.closeDetail();}}
          >
            Cancel
          </button>

          <button
            className='task-detail-save'
            type='button'
            onClick={() => {this.updateTask();}}
          >
            Save
          </button>
        </div>

        <div className='task-detail-log-controls'>
          <button
            className='toggle-detail-log'
            type='button'
            onClick={() => {this.setState({ showLog: !this.state.showLog }); }}
          />
          <label className='toggle-detail-log-label'>
            {(this.state.showLog) ? 'Hide log' : 'Show log'}
          </label>

          {showFormButton}
        </div>

        {logForm}
        {logContainer}
      </div>
    );
  }

  // setFieldAndSubmit(field, value) {
  //   if (value !== this.state[field]) {
  //     const stateObject = {};
  //     stateObject[field] = value;

  //     this.setState(stateObject, () => {
  //       this.updateTask(stateObject);
  //     });
  //   }
  // }

  showLogForm() {
    this.setState({ showLogForm: true });
  }

  closeLogForm() {
    this.setState({ showLogForm: false });
  }

  // hasChanged() {    
  //   const propFields = {
  //     title: this.props.title,
  //     time: this.props.time,
  //     effort: this.props.effort,
  //     focus: this.props.focus,
  //     category: this.props.category,
  //     complete: this.props.complete,
  //     startDate: this.props.startDate,
  //     dueDate: this.props.dueDate,
  //   };

  //   const stateFields = {
  //     title: this.state.title,
  //     time: this.state.time,
  //     effort: this.state.effort,
  //     focus: this.state.focus,
  //     category: this.state.category,
  //     complete: this.state.complete,
  //     startDate: this.state.startDate,
  //     dueDate: this.state.dueDate,
  //   };

  //   if (JSON.stringify(stateFields) === JSON.stringify(propFields)) {
  //     this.setState({ dirty: false });
  //   } else {
  //     this.setState({ dirty: true });
  //   }
  // }

  updateTask() {
    const updateFields = {};

    if (this.state.title !== this.props.title) {
      updateFields.title = this.state.title;
    }

    if (this.state.time !== this.props.time) {
      updateFields.time = this.state.time;
    }

    if (this.state.effort !== this.props.effort) {
      updateFields.effort = this.state.effort;
    }

    if (this.state.focus !== this.props.focus) {
      updateFields.focus = this.state.focus;
    }

    if (this.state.category !== this.props.category) {
      updateFields.category = this.state.category;
    }

    if (this.state.startDate !== this.props.startDate) {
      updateFields.startDate = this.state.startDate;
    }

    if (this.state.dueDate !== this.props.dueDate) {
      updateFields.dueDate = this.state.dueDate;
    }

    // If no fields were updated, don't bother
    if (Object.keys(updateFields).length){
      this.props.updateTask(this.props._id, updateFields);
    }
  }
}

export default TaskDetail;