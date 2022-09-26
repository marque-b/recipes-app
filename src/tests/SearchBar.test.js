import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Search Bar tests', () => {
  it('The search bar inputs are rendered', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'admin@admin.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const initialLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const executeSearchButton = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(initialLetterSearchRadio).toBeInTheDocument();
    expect(executeSearchButton).toBeInTheDocument();
  });

  it('The user receives an alert if the search input is empty', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'admin@admin.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    jest.spyOn(global, 'alert');
    const executeSearchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('The user receives an alert if the search input have more than 1 letter', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'admin@admin.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const searchInput = screen.getByTestId('search-input');
    const initialLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const executeSearchButton = screen.getByTestId('exec-search-btn');

    jest.spyOn(global, 'alert');
    userEvent.click(initialLetterSearchRadio);
    userEvent.type(searchInput, 'aa');
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
