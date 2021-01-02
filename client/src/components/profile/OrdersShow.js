import React from 'react';
import { Link } from 'react-router-dom';

const OrdersShow = (props) => {
  const renderOrders = () => {
    return props.orders.map((order) => {
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
  };

  return (
    <>
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
        <tbody>{renderOrders()}</tbody>
      </table>
    </>
  );
};

export default OrdersShow;
