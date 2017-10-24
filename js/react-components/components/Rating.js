import React from 'react';

class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: (this.props.min) ? this.props.min : 1,
      max: (this.props.max) ? this.props.max : 3,
      rating: this.props.rating,
    };
  }

  render() {
    const rating = [];
    for (let i = 1; i < this.state.min; i++) {
      rating.push(<span className='rating-inert' key={i}/>);
    }

    for (let i = this.state.min; i <= this.state.max; i++) {
      const ratingClass = (i > this.state.rating) ? 'rating-empty' : 'rating-full';
      rating.push(<span
          className={ratingClass}
          key={i}
          onMouseOver={() => {this.setPreview(i);}}
          onMouseLeave={() => {this.resetPreview();}}
          onClick={() => {this.setAmount(i);}}
        />);
    }

    return (
      <div className='rating-wrapper'>
        {rating}
      </div>
    );
  }

  setPreview(rating) {
    this.setState({ rating });
  }

  resetPreview() {
    this.setState({ rating: this.props.rating });
  }

  setAmount(rating) {
    this.props.setRating(rating);
  }
}

export default Rating;