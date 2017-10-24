import React from 'react';
import DateInput from './DateInput.js';

/**
 * Class DateTimeInput
 * Wraps date, hour, and minute inputs.
 * @prop {Date}     date  Initial date value to populate input with. Optional.
 * @prop {Function} submit  Function to call when a value is changed.
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

  componentWillReceiveProps(newProps) {
    // If the component was given a new, non-null date, overwrite values.
    if (newProps.date !== null) {
      if (this.props.date.getTime() !== newProps.date.getTime()) {
        const newDate = newProps.date;

        let newHour = newDate.getHours();
        let newMeridiem = 'am';

        if (newHour > 11) {
          newMeridiem = 'pm';
        }
        if (newHour > 12) {
          newHour -= 12;
        }
        if (newHour === 0) {
          newHour = 12;
        }

        this.setState({
          date: newDate,
          hour: newHour,
          minute: newDate.getMinutes(),
          meridiem: newMeridiem,
        });
      }
    }
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
      <div className='datetime-input-wrapper'>
        <DateInput date={this.state.date} submit={(date) => {
          this.setState({ date: date }, this.submit);
        }} />

        <div className='datetime-dropdowns'>
          <select
            className='datetime-hour-dropdown'
            value={this.state.hour}
            onChange={(event) => {
              this.setState({ hour: parseInt(event.target.value) }, this.submit);
            }}
          >
            {hourOptions}
          </select>

          <select
            className='datetime-min-dropdown'
            value={this.state.minute}
            onChange={(event) => {
              this.setState({ minute: parseInt(event.target.value) }, this.submit);
            }}
          >
            {minuteOptions}  
          </select>
          
          <select
            className='datetime-meridiem-dropdown'
            value={this.state.meridiem}
            onChange={(event) => {
              this.setState({ meridiem: event.target.value }, this.submit);
            }}
          >
            <option value='am'>AM</option>
            <option value='pm'>PM</option>
          </select>
        </div>
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