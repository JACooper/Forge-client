import React from 'react';
import DateInput from './dateinput/DateInput.js';
import LogDetail from './LogDetail.js';
import LogForm from './LogForm.js';
import Rating from './Rating.js';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.updateTask = this.updateTask.bind(this);
    this.showLogForm = this.showLogForm.bind(this);
    this.closeLogForm = this.closeLogForm.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);

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
    };
  }

  render() {
    const categoryOptions = this.props.categories.map((category) => {
      return (<option key={category._id} className='category-option' value={category._id}>
          {category.name}
        </option>);
    });

    const showFormButton = (this.state.showLog) ? (
      <button className='show-log-form' type='button' onClick={() => {this.showLogForm();}}/>
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

    const sortedLogs = (this.props.log) ?
      Array.from(this.props.log).sort((log1, log2) => {
        // Newest logs appear first
        return log2.date.getTime() - log1.date.getTime();
      }) : (null);


    let logIndex = 0;
    const workLog = (sortedLogs) ? 
      sortedLogs.map((log) => {
        return (<LogDetail
            key={log.date.getTime().toString() + logIndex++}
            log={log}
          />);
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
          maxLength='50'
          value={this.state.title}
          onChange={(e) => {
            if (e.target.value !== '') {
              this.setState({ title: e.target.value });
            }
          }} />
        <div className='task-detail-attributes'>
          <div>
            <label className='task-detail-attribute-label'>Time</label>
            <div className='task-detail-attribute-rating'>
              <div className='task-detail-time-img' />
              <Rating rating={this.state.time} setRating={
                (stars) => {this.changeDifficulty('time', stars);}
              }/>
            </div>
          </div>
          <div>
            <label className='task-detail-attribute-label'>Effort</label>
            <div className='task-detail-attribute-rating'>
              <div className='task-detail-effort-img' />
              <Rating rating={this.state.effort} setRating={
                (stars) => {this.changeDifficulty('effort', stars);}
              }/>
            </div>
          </div>
          <div>
            <label className='task-detail-attribute-label'>Focus</label>
            <div className='task-detail-attribute-rating'>
              <div className='task-detail-focus-img' />
              <Rating rating={this.state.focus} setRating={
                (stars) => {this.changeDifficulty('focus', stars);}
              }/>
            </div>
          </div>
        </div>

        <div className='task-detail-dates'>
          <div className='task-detail-date'>
            <label className='task-detail-label'>Start date</label>
            <DateInput date={this.state.startDate} submit={
              (date) => { this.setState({ startDate: date }); }
            }/>
          </div>
          <div className='task-detail-date'>
            <label className='task-detail-label'>Due date</label>
            <DateInput date={this.state.dueDate} submit={
              (date) => { this.setState({ dueDate: date }); }
            }/>
          </div>
        </div>

        <div className='task-detail-category'>
          <label className='task-detail-category-label'>Category</label>
          <select className='task-detail-category-dropdown' value={this.state.category._id} onChange={
            (e) => {this.setState({category: e.target.value});}
          }>
            {categoryOptions}
          </select>
        </div>

        <div className='task-detail-submit-controls'>
          <button className='task-detail-cancel' type='button' onClick={
            () => {this.props.closeDetail();}
          }>
            Cancel
          </button>

          <button className='task-detail-save' type='button' onClick={
            () => {this.updateTask();}
          }>
            Save
          </button>
        </div>

        <div className='task-detail-log-controls'>
          <label className='toggle-detail-log-label'>
            <button className='toggle-detail-log' type='button' onClick={
              () => {this.setState({ showLog: !this.state.showLog });}
            }/>
            {(this.state.showLog) ? 'Hide log' : 'Show log'}
          </label>
          {showFormButton}
        </div>

        {logForm}
        {logContainer}
      </div>
    );
  }

  showLogForm() {
    this.setState({ showLogForm: true });
  }

  closeLogForm() {
    this.setState({ showLogForm: false });
  }

  changeDifficulty(field, amount) {
    const updateField = {};
    updateField[field] = amount;
    this.setState(updateField);
  }

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

    if (this.state.category._id !== this.props.category._id) {
      updateFields.category = this.state.category;
    }

    if (this.state.startDate !== this.props.startDate) {
      updateFields.startDate = this.state.startDate;
    }

    if (this.state.dueDate !== this.props.dueDate) {
      updateFields.dueDate = this.state.dueDate;
    }

    // If no fields were updated, don't bother
    if (Object.keys(updateFields).length > 0) {
      this.props.updateTask(this.props._id, updateFields);
    }
  }
}

export default TaskDetail;