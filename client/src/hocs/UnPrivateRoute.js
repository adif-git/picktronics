import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const UnPrivateRoute = ({ component: Component, isSignedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isSignedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default UnPrivateRoute;
