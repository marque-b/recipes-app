import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helper/renderWithRouter';

describe('Header page', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Check Header with route /profile', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
    const img = screen.getByTestId('profile-top-btn');
    userEvent.click(img);
    // const h1 = screen.getByRole('heading', {
    //   name: 'Profile',
    //   level: 1,
    // });
    // expect(h1).toBeInTheDocument();
  });
});
