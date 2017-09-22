import React from 'react';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.setActive = this.setActive.bind(this);
    this.addCategory = this.addCategory.bind(this);

    this.state = {
      newCategoryName: '',
    };
  }

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const categories = this.props.categories.map((category) => {
      if (category.name === this.props.activeCategory) {
        return (
          <p
            key={category._id}
            className='category-item active-category'>
              {category.name}
          </p>
        );
      }
      return (
        <p
          key={category._id}
          className='category-item'
          onClick={() => {this.setActive(category.name);}}>
            {category.name}
        </p>
      );
    });

    if (this.props.activeCategory !== '') {
      categories.unshift(<p
        key='AllCategories'
        className='category-item'
        onClick={() => {this.setActive('');}}>
          All Categories
        </p>);
    } else {
      categories.unshift(<p
        key='AllCategories'
        className='category-item active-category'>
          All Categories
        </p>);
    }

    return (
      <div className='category-list-wrapper'>
        {categories}
        <input
          className='new-category-input'
          type='text'
          placeholder='New category. . .'
          value={this.state.newCategoryName}
          maxLength="19"
          onChange={(e) => {
            this.setState({newCategoryName: e.target.value});
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.addCategory();
            }

            e.preventDefault();
          }}
        />
      </div>
    );
  }

  setActive(category) {
    this.props.setActiveCategory(category);
  }

  addCategory() {
    const category = { name: this.state.newCategoryName };
    this.setState({newCategoryName: ''});
    this.props.addCategory(category);
  }
}

export default CategoryList;