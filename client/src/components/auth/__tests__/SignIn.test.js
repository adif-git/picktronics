import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { render, screen } from '../../../test/test-utils';
import SignIn from '../../auth/SignIn';

const setup = () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SignIn />
    </Router>
  );

  return { history };
};

it('renders sign in page', () => {
  setup();
  expect(screen.getByText('SIGN IN')).toBeInTheDocument();
});

it('test sign up link redirect', () => {
  const { history } = setup();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();

  userEvent.click(screen.getByText('Sign Up'));
  expect(history.location.pathname).toBe('/auth/signup');
});

it('renders auth form', () => {
  setup();

  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
});
