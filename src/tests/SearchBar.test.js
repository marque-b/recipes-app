import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import { EXEC_SEARCH_BTN, SEARCH_TOP_BTN } from '../services/consts';
import Provider from '../context/Provider';
import Meals from '../pages/Meals';

describe('Search Bar tests', () => {
  it('The search bar inputs are rendered', () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

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
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    jest.spyOn(global, 'alert');
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('The user receives an alert if the search input have more than 1 letter', () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

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
