import React from 'react';

/**
 * Class CalendarInputWeek
 * Populates a single row of the calendar widget
 * @prop {Number} month  Numeric value of current month. Used for applying classes
 * @prop {Number} currentDay  Numeric value of current day. Used for applying classes
 * @prop {Array} days  Array of date objects { date: {Number}, month: {Number}, year: {Number}, }
 * @prop {Function} selectDate  Function to call when an individual date is clicked
 */
class CalendarInputWeek extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const days = this.props.days.map((day) => {
      let classes = 'calendar-day';
      if (day.month !== this.props.month) {
        classes += ' off-month';
      } else if (day.date === this.props.currentDay) {
        classes += ' current-day';
      }

      return <p
        key={`day${day.date}${day.month}`}
        className={classes}
        onClick={() => {this.props.selectDate(day.date, day.month, day.year);}}>
          {day.date}
        </p>;
    });

    return (
      <div className='calendar-input-week'>
        {days}
      </div>
    );
  }
}

export default CalendarInputWeek;