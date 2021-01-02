import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../actions';
import Loader from '../Loader';

class ProductUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    await this.props.fetchProducts();
    this.setState({ isFetched: true });
  };

  renderProducts() {
    return (
      <div className="ui middle aligned list">
        {this.props.products.map((product) => {
          return (
            <div className="item" key={product.id}>
              <div className="right floated content">
                <Link
                  to={`/products/update/${product.id}`}
                  className="ui blue animated fade button"
                >
                  <div className="visible content">Update Product</div>
                  <div className="hidden content">
                    <i className="edit outline icon"></i>
                  </div>
                </Link>
              </div>
              <img className="ui mini image" src="/img/img.png" alt="..." />
              <div className="content">
                <Link to={`/products/${product.id}`} className="header">
                  {product.title}
                </Link>
                <div className="">
                  <p>Price: {product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (!this.state.isFetched) {
      return <Loader />;
    }

    return (
      <div className="ui container">
        <div className="ui hidden divider"></div>
        <div className="ui stackable two column grid">
          <div className="left floated column">
            <h1>My Products</h1>
          </div>
          <div className="right floated column">
            <Link to="/products/new" className="ui right floated button">
              Add Product
            </Link>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        {this.props.products ? this.renderProducts() : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.auth.user;
  const userProducts = Object.values(state.products.data).filter(
    (product) => product.userId === user.id
  );
  return {
    products: userProducts,
  };
};

export default connect(mapStateToProps, { fetchProducts })(ProductUser);
