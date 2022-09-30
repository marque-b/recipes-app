import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import allMeals from './mocks/allMeals.json';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Provider from '../context/Provider';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import App from '../App';

const EXEC_SEARCH_BTN = 'exec-search-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const CARD_NAME = '0-card-name';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(allMeals),
  });
});

describe('Search Bar tests', () => {
  it('The search bar inputs are rendered', async () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_RADIO);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);
    const initialLetterSearchRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(initialLetterSearchRadio).toBeInTheDocument();
    expect(executeSearchButton).toBeInTheDocument();
  });

  it('The user receives an alert if the search input is empty', async () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    jest.spyOn(global, 'alert');
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('The user receives an alert if the search input have more than 1 letter', async () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const initialLetterSearchRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    jest.spyOn(global, 'alert');
    userEvent.click(initialLetterSearchRadio);
    userEvent.type(searchInput, 'aa');
    userEvent.click(executeSearchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('The food recipe detail is exhibited when the search return a single recipe', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(oneMeal),
    });

    const { history } = renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);

    userEvent.click(nameSearchRadio);

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(executeSearchButton);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  it('The drink recipe detail is exhibited when the search return a single recipe', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(oneDrink),
    });

    const { history } = renderWithRouter(<App />, '/drinks');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const nameSearchRadio = screen.getByTestId(NAME_RADIO);

    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'Gin');
    userEvent.click(executeSearchButton);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
  });

  it('Test search food recipe by ingredient', async () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(ingredientSearchRadio);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(executeSearchButton);

    const cardName = await screen.findByTestId(CARD_NAME);
    expect(cardName).toBeInTheDocument();
  });

  it('Test search drink recipe by ingredient', async () => {
    renderWithRouter(<Provider><Drinks /></Provider>, '/drinks');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(ingredientSearchRadio);
    userEvent.type(searchInput, 'gin');
    userEvent.click(executeSearchButton);

    const cardName = await screen.findByTestId(CARD_NAME);
    expect(cardName).toBeInTheDocument();
  });

  it('Test search food recipe by name', async () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const nameRadio = screen.getByTestId(NAME_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'hot');
    userEvent.click(executeSearchButton);

    const cardName = await screen.findByTestId(CARD_NAME);
    expect(cardName).toBeInTheDocument();
  });

  it('Test search drink recipe by name', async () => {
    renderWithRouter(<Provider><Drinks /></Provider>, '/drinks');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const nameRadio = screen.getByTestId(NAME_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'hot');
    userEvent.click(executeSearchButton);

    const cardName = await screen.findByTestId(CARD_NAME);
    expect(cardName).toBeInTheDocument();
  });

  it('Test search drink recipe by initial', async () => {
    renderWithRouter(<Provider><Drinks /></Provider>, '/drinks');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const initialLetterSearchRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(initialLetterSearchRadio);
    userEvent.type(searchInput, 'h');
    userEvent.click(executeSearchButton);

    const cardName = await screen.findByTestId(CARD_NAME);
    expect(cardName).toBeInTheDocument();
  });

  it('Test search meal recipe by initial', async () => {
    renderWithRouter(<Provider><Meals /></Provider>, '/meals');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);

    const initialLetterSearchRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const executeSearchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(initialLetterSearchRadio);
    userEvent.type(searchInput, 'h');
    userEvent.click(executeSearchButton);

    const cardName = await screen.findByTestId(CARD_NAME);
    expect(cardName).toBeInTheDocument();
  });
});
