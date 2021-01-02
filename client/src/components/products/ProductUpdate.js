import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { updateProduct, fetchProduct } from '../../actions';
import _ from 'lodash';
import Loader from '../Loader';

class ProductUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetched: false };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    await this.props.fetchProduct(this.props.match.params.id);
    this.setState({ isFetched: true });
  };

  onSubmit = (formValues) => {
    this.props.updateProduct(formValues, this.props.match.params.id);
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui hidden divider"></div>
        <h1 className="ui header">Update Product</h1>
        {this.state.isFetched ? (
          <ProductForm
            onSubmit={this.onSubmit}
            error={this.props.product.error}
            initialValues={_.pick(this.props.product.data, 'title', 'price')}
          />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data, error } = state.products;
  return {
    product: {
      data: data[ownProps.match.params.id],
      error,
    },
  };
};

export default connect(mapStateToProps, { updateProduct, fetchProduct })(
  ProductUpdate
);
