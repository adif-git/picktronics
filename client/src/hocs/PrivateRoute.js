import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isSignedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/auth/signin' }} />
      )
    }
  />
);

export default PrivateRoute;
