import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, isSignedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isSignedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    }
  />
);

export default PublicRoute;
