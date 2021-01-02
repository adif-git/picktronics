import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchOrder, createPayment } from '../../actions';
import StripeCheckout from 'react-stripe-checkout';
import Loader from '../Loader';
import history from '../../history';

const OrderShow = (props) => {
  const [active, setActive] = useState(true); // To control tab conditions
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchOrderProduct = async () => {
      await props.fetchOrder(props.match.params.id);
      setIsFetched(true);
    };

    fetchOrderProduct();
  }, []);

  useEffect(() => {
    if (isFetched && props.order.data.status === 'created') {
      const findTimeLeft = () => {
        const msLeft = new Date(props.order.data.expiresAt) - new Date();
        setTimeLeft(Math.round(msLeft / 1000));
      };

      findTimeLeft();
      const timer = setInterval(findTimeLeft, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  });

  const renderMessage = () => {
    const { status } = props.order.data;
    if (status === 'created' && timeLeft >= 1) {
      return (
        <div className="ui icon large warning message">
          <i className="clock icon" />
          <div className="content">
            <div className="header">Time left to pay:</div>
            <p>{timeLeft} seconds</p>
          </div>
        </div>
      );
    } else if (status === 'complete') {
      return (
        <div className="ui icon large positive message">
          <i className="check circle icon" />
          <div className="content">
            <div className="header">Payment succesful!</div>
          </div>
        </div>
      );
    }

    return (
      <div className="ui icon large negative message">
        <i className="clock icon" />
        <div className="content">
          <div className="header">Time left to pay:</div>
          <p>Expired</p>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    return (
      <>
        <div
          className={`item step ${active ? 'active' : null}`}
          onClick={() => setActive(true)}
        >
          <i className="shopping basket icon" />
          <div className="content">
            <div className="title">Order</div>
            <div className="description">Your order description</div>
          </div>
        </div>
        <div
          className={`item step ${!active ? 'active' : null}`}
          onClick={() => setActive(false)}
        >
          <i className="payment icon" />
          <div className="content">
            <div className="title">Payment</div>
            <div className="description">Select your payment method</div>
          </div>
        </div>
      </>
    );
  };

  const renderSegment = () => {
    const { id, product, status } = props.order.data;
    const { email } = props.user;
    return (
      <>
        <div
          className={`ui bottom attached tab segment ${
            active ? 'active' : null
          }`}
        >
          <h4 className="ui horizontal divider header">
            <i className="sticky note icon"></i>
            Description
          </h4>
          <table className="ui definition table">
            <tbody>
              <tr>
                <td className="two wide column">Order ID</td>
                <td style={{ textTransform: 'uppercase' }}>{id}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{product.title}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{product.price}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td style={{ textTransform: 'capitalize' }}>{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className={`ui bottom attached tab segment center aligned ${
            !active ? 'active' : null
          }`}
        >
          <div className="ui hidden divider"></div>
          <StripeCheckout
            token={({ id }) => handlePayment(id)}
            stripeKey={process.env.STRIPE_PB_KEY}
            amount={product.price * 100}
            email={email}
            className={`large ui button ${
              status === 'complete' || status === 'cancelled'
                ? 'disabled'
                : null
            }`}
          />
        </div>
      </>
    );
  };

  const handlePayment = async (id) => {
    await props.createPayment({ token: id, orderId: props.order.data.id });
    window.location.reload();
  };

  if (props.order.error.length > 0) {
    history.push('/');
  }

  if (!isFetched) {
    return <Loader />;
  }

  if (props.order.data.status === 'created' && timeLeft < 0) {
    history.push(`/products/${props.order.data.product.id}`);
  }

  return (
    <>
      <div className="ui hidden divider"></div>
      {!props.order ? (
        <Loader />
      ) : (
        <div className="ui container">
          {renderMessage()}
          <div className="ui two top attached tabular menu steps">
            {renderStep()}
          </div>
          {renderSegment()}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { data, error } = state.orders;
  return {
    user: state.auth.user,
    order: {
      data: data[ownProps.match.params.id],
      error,
    },
  };
};

export default connect(mapStateToProps, { fetchOrder, createPayment })(
  OrderShow
);
