import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../test/test-utils';
import SignUp from '../../auth/SignUp';

const setup = () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SignUp />
    </Router>
  );

  return { history };
};

it('renders sign in page', () => {
  setup();
  expect(screen.getByText('SIGN UP')).toBeInTheDocument();
});

it('test sign up link redirect', () => {
  const { history } = setup();
  expect(screen.getByText('Sign In')).toBeInTheDocument();

  userEvent.click(screen.getByText('Sign In'));
  expect(history.location.pathname).toBe('/auth/signin');
});

it('renders auth form', () => {
  setup();

  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
});
