import React from 'react';
import DateInput from './DateInput.js';

/**
 * Class DateTimeInput
 * Wraps date, hour, and minute inputs.
 * @prop {Date}     date  Initial date value to populate input with. Optional.
 * @prop {Function} submit  Function to call when the "add reminder" button is clicked
 */
class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    const initialDate = (this.props.date) ? this.props.date : new Date();

    let initialHour = initialDate.getHours();
    let initialMeridiem = 'am';

    if (initialHour > 11) {
      initialMeridiem = 'pm';
    }
    if (initialHour > 12) {
      initialHour -= 12;
    }
    if (initialHour === 0) {
      initialHour = 12;
    }
    
    this.state = {
      date: initialDate,
      hour: initialHour,
      minute: initialDate.getMinutes(),
      meridiem: initialMeridiem,
    };
  }

  render() {
    const hourOptions = [];
    for (let i = 1; i < 12; i++) {
      hourOptions.push(<option key={i} value={i}>{i.toString().padStart(2, '0')}</option>);
    }
    hourOptions.push(<option key={0} value={0}>12</option>);

    const minuteOptions = [];
    for (let i = 0; i <= 59; i++) {
      minuteOptions.push(<option key={i} value={i}>{i.toString().padStart(2, '0')}</option>);
    }

    return (
      <div className='reminder-wrapper'>
        <DateInput date={this.state.date} submit={(date) => {
          this.setState({ date: date }, this.submit);
        }} />

        <select
          className='reminder-hour-dropdown'
          value={this.state.hour}
          onChange={(event) => {
            this.setState({ hour: parseInt(event.target.value) }, this.submit);
          }}
        >
          {hourOptions}
        </select>

        <select
          className='reminder-min-dropdown'
          value={this.state.minute}
          onChange={(event) => {
            this.setState({ minute: parseInt(event.target.value) }, this.submit);
          }}
        >
          {minuteOptions}  
        </select>
        
        <select
          className='reminder-meridiem-dropdown'
          value={this.state.meridiem}
          onChange={(event) => {
            this.setState({ meridiem: event.target.value }, this.submit);
          }}
        >
          <option value='am'>AM</option>
          <option value='pm'>PM</option>
        </select>
      </div>
    );
  }

  submit() {
    const date = this.state.date;
    let hour = this.state.hour;
    const minute = this.state.minute;
    const meridiem = this.state.meridiem;

    if (meridiem === 'pm') {
      hour += 12;
    }

    date.setHours(hour, minute, 0);

    if (date) {
      this.props.submit(date);
    }
  }

}

export default DateTimeInput;