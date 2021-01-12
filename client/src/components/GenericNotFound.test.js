import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../test/test-utils';
import GenericNotFound from './GenericNotFound';

const setup = () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <GenericNotFound />
    </Router>
  );

  return { history };
};

it('renders 404 page', () => {
  setup();
  expect(screen.getByText('404')).toBeInTheDocument();
});

it('simulate redirect to homepage if link clicked', () => {
  const { history } = setup();
  expect(screen.getByText('home')).toBeInTheDocument();

  userEvent.click(screen.getByText('home'));
  expect(history.location.pathname).toBe('/');
});
