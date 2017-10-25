import React from 'react';
import CalendarInputWeek from './CalendarInputWeek.js';

/**
 * Class CalendarInput
 * Creates & display calendar widget
 * @prop {Date}     date  Initial date value to populate input with. If null, new Date() will be used
 * @prop {Function} selectDate  Function to call when a date is clicked
 * @prop {Function} closeCalendar Function to call when the calendar needs to close itself
 */
class CalendarInput extends React.Component {
  constructor(props) {
    super(props);

    // Set up references to detect when user clicks outside of calendar component
    // See: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    this.clickOutside = this.clickOutside.bind(this);
    this.getMonthString = this.getMonthString.bind(this);

    const currentDate = (this.props.date) ? this.props.date : new Date();
    this.state = {
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnount() {
    document.removeEventListener('click', this.clickOutside);
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      const currentDate = (this.props.date) ? this.props.date : new Date();

      this.setState({
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      });
    }
  }

  render() {
    // Need to create days starting from first Sunday of previous month (or
    // first day of this month if it is a Sunday), until first Monday of
    // next month (or last day of this month if it is a Monday)

    let calendarDate = new Date(this.state.year, this.state.month, 1);
    const beginningOffset = calendarDate.getDay() % 7;

    // This will automatically set month as well, if necessary
    calendarDate.setDate(calendarDate.getDate() - beginningOffset);

    let createdLastDay = false;
    let dates = [];

    while (!createdLastDay) {
      dates.push({
        date: calendarDate.getDate(),
        month: calendarDate.getMonth(),
        year: calendarDate.getFullYear(),
      });

      calendarDate.setDate(calendarDate.getDate() + 1);
      // If you ever reach Sunday of next month, you know you're done
      if ((calendarDate.getMonth() > this.state.month
          || calendarDate.getFullYear() > this.state.year)
          && calendarDate.getDay() === 0) {
        createdLastDay = true;
      }
    }

    let weeks = [];
    while (dates.length > 0) {
      const days = dates.splice(0, 7);
      weeks.push({days});
    }

    const calendarDates = weeks.map((week) => {
      return <CalendarInputWeek
          key={`week${week.days[0].date}${week.days[0].month}`}
          month={this.state.month}
          currentDay={this.state.day}
          days={week.days}
          selectDate={this.props.selectDate}
        />;
    });

    return (
      <div className='calendar-wrapper' ref={(wrapper) => {this.wrapperRef = wrapper;}}>
        <div className='month-picker'>
          <button className='month-adjust' onClick={
            () => {
              if (this.state.month === 0) {
                this.setState({ month: 11, year: this.state.year - 1 });
              } else {
                this.setState({ month: (this.state.month - 1) });
              }
            }}>
              &lt;
            </button>
          <span className='curr-month'>{this.getMonthString()} {this.state.year}</span>
          <button className='month-adjust' onClick={
            () => {
              if (this.state.month === 11) {
                this.setState({ month: 0, year: this.state.year + 1 });
              } else {
                this.setState({month: (this.state.month + 1)});
              }
            }}>
              &gt;
            </button>
        </div>

        <div className='week-header'>
          <span className='week-header-day'>Sun</span>
          <span className='week-header-day'>Mon</span>
          <span className='week-header-day'>Tue</span>
          <span className='week-header-day'>Wed</span>
          <span className='week-header-day'>Thu</span>
          <span className='week-header-day'>Fri</span>
          <span className='week-header-day'>Sat</span>
        </div>

        {calendarDates}
      </div>
    );
  }

  clickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeCalendar();
    }
  }

  getMonthString() {
    switch(this.state.month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    }
  }
}

export default CalendarInput;