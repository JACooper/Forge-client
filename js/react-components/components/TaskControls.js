import React from 'react';

class TaskControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const completeViewText = (this.props.showComplete) ? 'Hide complete' : 'Show complete';

    return (
      <div className='task-controls-wrapper'>
        <div className='list-sort-controls'>
          <div>
            <label>Emphasize:</label>
            <select
              className='list-sort-dropdown'
              value={this.props.emphasisValue}
              onChange={(e) => {this.props.changeEmphasis(e.target.value);}}
            >
              <option value='none'>None</option>
              <option value='time'>Time</option>
              <option value='effort'>Effort</option>
              <option value='focus'>Focus</option>
            </select>
          </div>

          <div>
            <label>Sort type:</label>
            <select
              className='list-sort-dropdown'
              value={this.props.sortTypeValue}
              onChange={(e) => {this.props.changeSortType(e.target.value);}}
            >
              <option value='ascending'>Ascending</option>
              <option value='descending'>Descending</option>
            </select>
          </div>

          <div>
            <label>Sort by:</label>
            <select
              className='list-sort-dropdown'
              value={this.props.sortByValue}
              onChange={(e) => {this.props.changeSortBy(e.target.value);}}
            >
              <option value='sum'>Sum</option>
              <option value='time'>Time</option>
              <option value='effort'>Effort</option>
              <option value='focus'>Focus</option>
              <option value='start'>Start date</option>
              <option value='due'>Due date</option>
            </select>
          </div>

          <button type='button' onClick={this.props.toggleShowComplete}>{completeViewText}</button>
        </div>
      </div>
    );
  }
}

export default TaskControls;