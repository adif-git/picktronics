import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import Loader from './Loader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetched: false };
  }

  componentDidMount() {
    this.fetchProducts();
    this.setState({ isFetched: true });
  }

  fetchProducts = async () => {
    await this.props.fetchProducts();
  };

  renderProducts() {
    return this.props.products.map((product) => {
      return (
        <Link
          to={`/products/${product.id}`}
          className="raised card"
          key={product.id}
        >
          <div className="ui padded segment">
            <div className="ui fluid image">
              <div className="ui green ribbon large label">
                <i className="money bill alternate icon"></i> Price:{' '}
                {product.price}
              </div>
              <img src="/img/img.png" alt="..." />
            </div>
            <div className="content" style={{ paddingTop: '20px' }}>
              <div className="ui header">{product.title}</div>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <>
        <div
          className="ui vertical masthead center aligned segment"
          style={{ padding: '100px 0px' }}
        >
          <div className="ui text container">
            <div className="ui hidden divider"></div>
            <div className="ui header">
              <h1 className="ui header">PICKTRONICS</h1>
              <h2>Your Electronics Exchange Marketplace!</h2>
            </div>
          </div>
          <div className="ui hidden divider"></div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui container">
          <div className="ui stackable four doubling link cards">
            {this.state.isFetched ? this.renderProducts() : <Loader />}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: Object.values(state.products.data),
  };
};

export default connect(mapStateToProps, { fetchProducts })(Home);
