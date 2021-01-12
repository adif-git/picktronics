import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PublicRoute from '../PublicRoute';

it('should render component if user not signed in', () => {
  const history = createMemoryHistory();
  const PublicComponent = () => <div>Component</div>;

  render(
    <Router initialEntries={['/publicpath']} history={history}>
      <PublicRoute isSignedIn={false} component={PublicComponent} />
    </Router>
  );

  expect(screen.getByText('Component')).toBeInTheDocument();
});

it('should redirect to home page if user signed in', () => {
  const history = createMemoryHistory();
  const PublicComponent = () => <div>Component</div>;

  render(
    <Router initialEntries={['/publicpath']} history={history}>
      <PublicRoute isSignedIn={true} component={PublicComponent} />
    </Router>
  );

  expect(history.location.pathname).toBe('/');
  expect(screen.queryByText('Component')).toBeNull();
});
