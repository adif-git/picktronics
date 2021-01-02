import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { createProduct } from '../../actions';

class ProductCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createProduct(formValues);
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui hidden divider"></div>
        <h1 className="ui header">Add Product</h1>
        <ProductForm onSubmit={this.onSubmit} error={this.props.error} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.products.error,
  };
};

export default connect(mapStateToProps, { createProduct })(ProductCreate);
