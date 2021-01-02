import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchOrders } from '../../actions';
import ProductsShow from './ProductsShow';
import OrdersShow from './OrdersShow';
import ProfileShow from './ProfileShow';
import HelpShow from './HelpShow';
import Loader from '../Loader';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          label: 'profile',
          active: true,
        },
        {
          label: 'products',
          active: false,
        },
        {
          label: 'orders',
          active: false,
        },
        {
          label: 'help',
          active: false,
        },
      ],
      isFetched: false,
    };
  }

  componentDidMount() {
    this.fetchOrdersAndProducts();
  }

  fetchOrdersAndProducts = async () => {
    await this.props.fetchOrders();
    await this.props.fetchProducts();
    this.setState({ isFetched: true });
  };

  handleTab(e) {
    let newState = this.state.tabs.map((tab) => {
      if (tab.label === e.target.id) {
        let newItem = {
          label: tab.label,
          active: true,
        };
        return newItem;
      } else {
        let newItem = {
          label: tab.label,
          active: false,
        };
        return newItem;
      }
    });

    this.setState({ tabs: newState });
  }

  renderTabs() {
    return this.state.tabs.map((tab, key) => {
      return (
        <div
          className={`${tab.active ? 'active' : null} red link item`}
          id={tab.label}
          onClick={(e) => this.handleTab(e)}
          key={key}
        >
          <div
            className="header"
            id={tab.label}
            style={{ textTransform: 'capitalize' }}
          >
            {tab.label}
          </div>
        </div>
      );
    });
  }

  renderDescription() {
    const { label } = this.state.tabs.find((tab) => tab.active === true);
    const statistics = {
      orders: Object.keys(this.props.userOrders).length,
      products: Object.keys(this.props.userProducts).length,
    };

    switch (label) {
      case 'profile':
        return <ProfileShow user={this.props.user} statistics={statistics} />;
      case 'products':
        return <ProductsShow products={this.props.userProducts} />;
      case 'orders':
        return <OrdersShow orders={this.props.userOrders} />;
      case 'help':
        return <HelpShow />;
      default:
        return null;
    }
  }

  render() {
    if (!this.state.isFetched) {
      <Loader />;
    }

    return (
      <div className="ui container fluid" style={{ padding: '0 35px' }}>
        <div className="ui hidden divider"></div>
        {this.props.userProducts && this.props.userOrders ? (
          <div className="ui grid">
            <div className="three wide column">
              <div className="ui vertical fluid left tabular menu">
                {this.renderTabs()}
              </div>
            </div>
            <div className="thirteen wide stretched column">
              <div className="ui container">{this.renderDescription()}</div>
            </div>
          </div>
        ) : null}
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
    user,
    userProducts,
    userOrders: Object.values(state.orders.data).reverse(),
  };
};

export default connect(mapStateToProps, { fetchOrders, fetchProducts })(
  Profile
);
