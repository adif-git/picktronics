import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../actions';
import Loader from '../Loader';

class OrderUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetched: false,
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    await this.props.fetchOrders();
    this.setState({ isFetched: true });
  };

  renderOrders() {
    return this.props.orders.map((order) => {
      return (
        <tr key={order.id}>
          <td style={{ textTransform: 'uppercase' }} className="selectable">
            <Link to={`/orders/${order.id}`}>{order.id}</Link>
          </td>
          <td>{order.product.title}</td>
          <td>{order.product.price}</td>
          <td
            style={{ textTransform: 'capitalize' }}
            className={
              order.status === 'complete'
                ? 'positive'
                : order.status === 'cancelled'
                ? 'negative'
                : null
            }
          >
            <i
              className={`icon ${
                order.status === 'complete'
                  ? 'checkmark'
                  : order.status === 'cancelled'
                  ? 'close'
                  : 'attention'
              }`}
            ></i>
            {order.status}
          </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.state.isFetched) {
      <Loader />;
    }

    return (
      <div className="ui container">
        <div className="ui hidden divider"></div>
        <div className="ui stackable two column grid">
          <div className="left floated column">
            <h1>My Orders</h1>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <table className="ui celled four column striped table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          {this.props.orders ? (
            <tbody>{this.renderOrders()}</tbody>
          ) : (
            <Loader />
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: Object.values(state.orders.data).reverse(),
  };
};

export default connect(mapStateToProps, { fetchOrders })(OrderUser);
