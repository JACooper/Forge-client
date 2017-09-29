import React from 'react';
import CalendarInput from './CalendarInput.js';

/**
 * Class DateInput
 * Wraps text & calendar widget inputs, and validates return.
 * @prop {Date}     date  Initial date value to populate input with. Optional.
 * @prop {Function} submit  Function to call upon date validation success
 */
class DateInput extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.padDate = this.padDate.bind(this);
    this.restrictInput = this.restrictInput.bind(this);
    this.sanitizeInput = this.sanitizeInput.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.validateDate = this.validateDate.bind(this);

    const date = (this.props.date) ?
      this.padDate(this.props.date.getMonth() + 1)
       + '/' + this.padDate(this.props.date.getDate())
       + '/' + this.props.date.getFullYear() : '';
    
    this.state = {
      dateInput: date,
      dateInputCursor: date.length,
      displayCalendar: false,
      error: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      const date = (newProps.date) ?
        this.padDate(newProps.date.getMonth() + 1)
         + '/' + this.padDate(newProps.date.getDate())
         + '/' + newProps.date.getFullYear() : '';

      this.setState({
        dateInput: date,
      });
    }
  }

  componentDidUpdate() {
    this.refs.inputText.setSelectionRange(this.state.dateInputCursor, this.state.dateInputCursor);
  }

  render() {
    const calendar = (this.state.displayCalendar) ? (
        <CalendarInput selectDate={this.selectDate} date={this.props.date} />
      ) : (null);

    const errorDisplay = (this.state.error) ? (
        <p className='date-error-text'>{this.state.error}</p>
      ) : (null);

    return (
      <div className='date-input-wrapper'>
        <input
          className='date-input-text'
          type='text'
          placeholder='mm/dd/yyyy'
          maxLength='10'
          value={this.state.dateInput}
          onKeyDown={this.restrictInput}
          onChange={this.sanitizeInput}
          onBlur={() => {this.validateInput();}}
          ref='inputText'
        />
        <button
          type='button'
          className='date-input-show-calendar'
          onClick={() => {this.toggleCalendar();}}
        >
          &#128197;
        </button>
        {errorDisplay}
        {calendar}
      </div>
    );
  }

  toggleCalendar() {
    this.setState({
      displayCalendar: !this.state.displayCalendar,
    });
  }

  padDate(date) {
    return date.toString().padStart(2, '0');
  }

  restrictInput(event) {
    if (event.key !== undefined)  {
      const key = event.key;

      if (key !== 'ArrowLeft'
          && key !== 'ArrowRight' 
          && key !== 'Backspace' 
          && key !== 'Delete' 
          && key !== '0' 
          && key !== '1' 
          && key !== '2' 
          && key !== '3' 
          && key !== '4' 
          && key !== '5' 
          && key !== '6' 
          && key !== '7' 
          && key !== '8' 
          && key !== '9') {
        event.preventDefault();
        return false;
      }
    } else if (event.keyCode !== undefined) {
      const key = event.keyCode;
      if (!(key >= 48 && key <= 57) 
          && (key !== 8 && key !== 46 && key !== 37 && key !== 39)) {
        event.preventDefault();
        return false;
      }
    }
  }

  sanitizeInput(event) {
    let input = event.target.value;
    // Capture cursor and # of / chars to ensure cursor doesn't move unexpectedly
    let cursor = event.target.selectionStart;
    const slashes = input.match(/\//g);
    const numSlashes = (slashes) ? slashes.length : 0;
    let numNewSlashes = 0;

    input = input.replace(/\//g, '');
    if (input.length >= 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
      numNewSlashes += 1;
    }
    if (input.length >= 5) {
      input = input.slice(0, 5) + '/' + input.slice(5);
      numNewSlashes += 1;
    }

    // e.g. if we had 0 slashes before and have 1 now, we need to advance the cursor past the new slash
    cursor += Math.abs(numNewSlashes - numSlashes);

    this.setState({dateInput: input, dateInputCursor: cursor});
  }

  selectDate(day, month, year) {
    // Close calendar widget on date select
    this.setState({
      displayCalendar: false,
    });

    const date = this.padDate(month + 1) + '/' + this.padDate(day) + '/' + year;
    this.setState({dateInput: date});

    this.validateDate(day, month, year);
  }

  validateInput() {
    if (this.state.dateInput !== '') {
      if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(this.state.dateInput)) {
        const dateFields = this.state.dateInput.split('/');
        const month = parseInt(dateFields[0]) - 1;
        const day = parseInt(dateFields[1]);
        const year = parseInt(dateFields[2]);

        this.validateDate(day, month, year);
      } else {
        this.setState({
          error: 'Invalid date',
        });
      }
    } else {
      this.props.submit(null);
    }
  }

  validateDate(day, month, year) {
    const returnDate = new Date(year, month, day);
    if (returnDate === 'Invalid Date'
       || month !== returnDate.getMonth()
       || day !== returnDate.getDate()
       || year !== returnDate.getFullYear()) {
      this.setState({
        error: 'Invalid date',
      });
    } else {
      this.setState({
        error: null,
      });
      this.props.submit(returnDate);
    }
  }
}

export default DateInput;