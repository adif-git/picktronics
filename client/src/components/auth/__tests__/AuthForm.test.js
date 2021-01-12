import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { render, screen } from '../../../test/test-utils';
import AuthForm from '../AuthForm';

const setup = (error = []) => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <AuthForm error={error} />
    </Router>
  );

  return { history };
};

it('renders auth form page', () => {
  setup();

  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
});

it('show error messages on auth form', () => {
  const errors = [{ message: 'Error #1' }, { message: 'Error #2' }];
  setup(errors);

  // Check all error message on screen
  errors.map(({ message }) =>
    expect(screen.getByText(message)).toBeInTheDocument()
  );
});
