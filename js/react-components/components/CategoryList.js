import React from 'react';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const categories = this.props.categories.map((category) => {
      if (category.title === this.props.activeCategory) {
        return (<p className='category-item active-category'>{category.title}</p>);
      }
      return (<p className='category-item' onClick={() => {this.setActive(category.title);}}>{category.title}</p>);
    });

    return (
      <div className='category-list-wrapper'>
        {categories}
      </div>
    );
  }

  setActive(category) {
    this.props.setActiveCategory(category);
  }
}

export default CategoryList;