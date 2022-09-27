import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import { EMAIL_INPUT, PASSWORD_INPUT } from '../services/consts';

describe(' Login page', () => {
  it('Checks if navigating through header links, url path changes', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByText('Entrar');

    const emailValid = 'trybe@email.com';
    const passwordValid = '1234567';

    userEvent.type(email, emailValid);
    userEvent.type(senha, passwordValid);
    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const drinksImg = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksImg);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));

    const profileImg = screen.getByTestId('profile-top-btn');
    userEvent.click(profileImg);
    await waitFor(() => expect(history.location.pathname).toBe('/profile'));

    history.push('/done-recipes');
    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));

    history.push('/favorite-recipes');
    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });

  it('Checks if button shows Search Bar when clicked', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId('search-input');

    expect(searchBar).toBeInTheDocument();
  });
});
