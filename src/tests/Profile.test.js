import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import { EMAIL_INPUT } from '../services/consts';
import Profile from '../pages/Profile';

describe('Profile page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem('user', JSON.stringify({ email: EMAIL_INPUT }));
  });

  it('Check user email in the page', () => {
    renderWithRouter(<Profile />);
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail.textContent).toBe(EMAIL_INPUT);
  });

  it('Check button "Done Recipes" behavior', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Check button "Favorite Recipes" behavior', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Check button "Logout" behavior', () => {
    const { history } = renderWithRouter(<Profile />);
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);

    expect(history.location.pathname).toBe('/');
  });
});
