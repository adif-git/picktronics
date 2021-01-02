import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentUser } from '../actions';

import Header from './Header';
import history from '../history';

import Home from './Home';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Profile from './profile/Profile';
import ProductUser from './products/ProductUser';
import ProductShow from './products/ProductShow';
import ProductCreate from './products/ProductCreate';
import ProductUpdate from './products/ProductUpdate';
import OrderShow from './orders/OrderShow';
import OrderUser from './orders/OrderUser';
import GenericNotFound from './GenericNotFound';

import PrivateRoute from '../hocs/PrivateRoute';
import UnPrivateRoute from '../hocs/UnPrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
    };
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = async () => {
    await this.props.currentUser();
    this.setState({ isFetched: true });
  };

  render() {
    if (!this.state.isFetched) return null;

    return (
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />

          <UnPrivateRoute
            exact
            path="/auth/signup"
            isSignedIn={this.props.isSignedIn}
            component={SignUp}
          />
          <UnPrivateRoute
            exact
            path="/auth/signin"
            isSignedIn={this.props.isSignedIn}
            component={SignIn}
          />
          <PrivateRoute
            exact
            path="/auth/user"
            isSignedIn={this.props.isSignedIn}
            component={Profile}
          />

          <PrivateRoute
            exact
            path="/products"
            isSignedIn={this.props.isSignedIn}
            component={ProductUser}
          />
          <PrivateRoute
            exact
            path="/products/new"
            isSignedIn={this.props.isSignedIn}
            component={ProductCreate}
          />
          <Route exact path="/products/:id" component={ProductShow} />
          <PrivateRoute
            exact
            path="/products/update/:id"
            isSignedIn={this.props.isSignedIn}
            component={ProductUpdate}
          />

          <PrivateRoute
            exact
            path="/orders/"
            isSignedIn={this.props.isSignedIn}
            component={OrderUser}
          />
          <PrivateRoute
            exact
            path="/orders/:id"
            isSignedIn={this.props.isSignedIn}
            component={OrderShow}
          />

          <Route path="/404" component={GenericNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { currentUser })(App);
