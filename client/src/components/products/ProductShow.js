import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct, createOrder } from '../../actions';
import history from '../../history';
import Loader from '../Loader';

class ProductShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    await this.props.fetchProduct(this.props.match.params.id);
    this.setState({ isFetched: true });
  };

  renderDescription() {
    const { title, price } = this.props.product.data;
    return (
      <>
        <h2 className="header">{title}</h2>
        <h3 className="header">Price: {price}</h3>
        <h4 className="ui horizontal divider header">
          <i className="tag icon"></i>
          Description
        </h4>
        <p style={{ textAlign: 'justify' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id nunc
          varius velit euismod cursus at ut tellus. Donec eu tellus eu eros
          volutpat placerat at vitae lacus. Suspendisse dapibus nunc dolor, in
          scelerisque arcu posuere at. Nulla feugiat magna ut vestibulum
          iaculis. Nulla porta, magna et fermentum venenatis, quam mi posuere
          risus, sed pellentesque nunc nisi sed massa. Donec metus libero,
          blandit vitae iaculis eu, iaculis sed diam. Maecenas commodo tincidunt
          risus a tempor. Maecenas aliquet sem leo, quis sagittis magna
          malesuada ac. Sed sagittis nunc vel massa sollicitudin molestie.
          Pellentesque interdum consectetur faucibus. In convallis pretium
          lacus, vehicula pharetra odio placerat porttitor. Sed sit amet
          vestibulum augue, ac aliquam massa. Nullam blandit et nunc malesuada
          malesuada. Suspendisse luctus erat ipsum, a consequat dui tincidunt
          nec. Donec sem dui, bibendum sit amet cursus eget, aliquam vel justo.
          Vivamus egestas felis a eros rhoncus imperdiet. Nunc sodales semper
          sem non pellentesque. Fusce venenatis, elit non vestibulum imperdiet,
          tellus mauris lacinia mauris, vel luctus ipsum orci eget magna. Fusce
          erat nibh, convallis at accumsan ut, euismod sit amet purus. Vivamus
          et nunc eleifend, vestibulum mi sed, malesuada urna. Quisque congue
          ipsum non velit efficitur, eget placerat ante consequat. Donec mattis
          congue dolor eleifend suscipit. Pellentesque congue dui augue, sed
          ornare libero dapibus ac. Donec dapibus enim fermentum molestie
          dictum. Maecenas purus est, vestibulum sed nisl a, dignissim
          scelerisque ante. Suspendisse ut tempus ligula. Mauris commodo mi et
          luctus lobortis. Ut quis nulla sed purus sollicitudin lobortis gravida
          at mauris.
        </p>
      </>
    );
  }

  renderHeadline() {
    const { price } = this.props.product.data;
    return (
      <>
        <div className="ui fluid image">
          <div className="ui green ribbon large label">
            <i className="money bill alternate icon"></i>
            Price: {price}
          </div>
          <img src="/img/img.png" alt="..." style={{ marginBottom: '20px' }} />
        </div>
        {this.renderButton()}
      </>
    );
  }

  renderButton() {
    const { id: currentUser } = this.props.user;
    const {
      id: productId,
      userId: productOwner,
      orderId,
    } = this.props.product.data;
    return (
      <>
        {currentUser === undefined ? null : currentUser !== productOwner ? (
          <button
            className={`ui teal labeled icon fluid button ${
              !orderId ? null : 'disabled'
            }`}
            onClick={() => this.props.createOrder(productId)}
          >
            Order
            <i className="shopping cart icon"></i>
          </button>
        ) : (
          <Link
            to={`/products/update/${productId}`}
            className="ui blue labeled icon fluid button"
          >
            Update
            <i className="edit icon"></i>
          </Link>
        )}
      </>
    );
  }

  render() {
    if (!this.state.isFetched) {
      return <Loader />;
    }

    if (this.props.product.error.length > 0) {
      history.push('/404');
    }

    return (
      <>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two column grid container">
          {this.props.product.data ? (
            <>
              <div className=" six wide column">{this.renderHeadline()}</div>
              <div className="column">{this.renderDescription()}</div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data, error } = state.products;
  return {
    user: state.auth.user,
    product: {
      data: data[ownProps.match.params.id],
      error,
    },
  };
};

export default connect(mapStateToProps, { fetchProduct, createOrder })(
  ProductShow
);
