import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { render, screen } from '../test/test-utils';
import Header from './Header';

it('fully renders Header', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Header />
    </Router>
  );
  expect(screen.getByText('Picktronics')).toBeInTheDocument();
});

it('fully show components when user exist', () => {
  const history = createMemoryHistory();
  const auth = {
    isSignedIn: true,
    user: { email: 'test@test.com' },
  };
  render(
    <Router history={history}>
      <Header />
    </Router>,
    { initialState: { auth } }
  );
  expect(screen.getByText(auth.user.email)).toBeInTheDocument();
  expect(screen.getByText('My Profile')).toBeInTheDocument();
  expect(screen.getByText('My Products')).toBeInTheDocument();
  expect(screen.getByText('My Orders')).toBeInTheDocument();
  expect(screen.getByText('Sign Out')).toBeInTheDocument();

  expect(screen.queryByText('Sign In')).toBeNull();
  expect(screen.queryByText('Sign Up')).toBeNull();
});

it('fully show components when user not exist', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Header />
    </Router>
  );
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.queryByText('Sign Out')).toBeNull();
});
