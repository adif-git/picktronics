import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PrivateRoute from '../PrivateRoute';

it('should render component if user signed in', () => {
  const history = createMemoryHistory();
  const PrivateComponent = () => <div>Component</div>;

  render(
    <Router initialEntries={['/privatepath']} history={history}>
      <PrivateRoute isSignedIn={true} component={PrivateComponent} />
    </Router>
  );

  expect(screen.getByText('Component')).toBeInTheDocument();
});

it('should redirect to signin page if user not signed in', () => {
  const history = createMemoryHistory();
  const PrivateComponent = () => <div>Component</div>;

  render(
    <Router initialEntries={['/privatepath']} history={history}>
      <PrivateRoute isSignedIn={false} component={PrivateComponent} />
    </Router>
  );

  expect(history.location.pathname).toBe('/auth/signin');
});
