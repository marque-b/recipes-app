import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import { EMAIL_INPUT, EXEC_SEARCH_BTN, LOGIN_SUBMIT_BTN, PASSWORD_INPUT, VALID_EMAIL } from '../services/consts';

describe('Search Bar tests', () => {
  it('The search bar inputs are rendered', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const initialLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(initialLetterSearchRadio).toBeInTheDocument();
    expect(executeSearchButton).toBeInTheDocument();
  });

  it('The user receives an alert if the search input is empty', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    jest.spyOn(global, 'alert');
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('The user receives an alert if the search input have more than 1 letter', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const searchInput = screen.getByTestId('search-input');
    const initialLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    jest.spyOn(global, 'alert');
    userEvent.click(initialLetterSearchRadio);
    userEvent.type(searchInput, 'aa');
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
