import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import allDrinks from './mocks/allDrinks.json';
import renderWithRouter from './helper/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import Provider from '../context/Provider';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(allDrinks),
  }));

  global.window.document.execCommand = () => (true);
});

const DRINK_ROUTE = '/drinks/15997';
const FAVORITE_BTN = 'favorite-btn';

describe('Component DrinksDetails', () => {
  it('Check API request', async () => {
    renderWithRouter(<Provider><RecipeDetails /></Provider>, DRINK_ROUTE);

    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinkGG = await screen.findByTestId('recipe-photo');

    expect(drinkGG).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(url);
  });

  it('Check share button', async () => {
    renderWithRouter(<Provider><RecipeDetails /></Provider>, DRINK_ROUTE);

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    const linkCopied = await screen.findByText(/Link copied!/i);
    expect(linkCopied).toBeInTheDocument();
  });

  it('Check Start Recipe', async () => {
    global.window.localStorage.setItem('inProgressRecipes', '{"drinks":{}}');

    const { history } = renderWithRouter(
      <Provider><RecipeDetails /></Provider>,
      DRINK_ROUTE,
    );

    const startRecipeBtn = await screen.findByText(/Start Recipe/i);
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997/in-progress'));
  });

  it('Check Continue Recipe', async () => {
    global.window.localStorage.setItem('inProgressRecipes', '{ "drinks": {"15997": []}}');

    renderWithRouter(<Provider><RecipeDetails /></Provider>, DRINK_ROUTE);

    const continuRecipeBtn = await screen.findByText(/Continue Recipe/i);
    expect(continuRecipeBtn).toBeInTheDocument();
  });

  it('Remove favorites from localStorage', async () => {
    global.window.localStorage.setItem('favoriteRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]');

    renderWithRouter(<Provider><RecipeDetails /></Provider>, DRINK_ROUTE);

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteFromLocalStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(favoriteFromLocalStorage);
    expect(favorites).toHaveLength(0);
  });

  it('Push favorites into localStorage', async () => {
    global.window.localStorage.setItem('favoriteRecipes', '[]');

    renderWithRouter(<Provider><RecipeDetails /></Provider>, DRINK_ROUTE);

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteFromLocalStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(favoriteFromLocalStorage);
    expect(favorites).toHaveLength(1);
  });

  it('Push favorites into localStorage', async () => {
    global.window.localStorage.removeItem('favoriteRecipes');

    renderWithRouter(<Provider><RecipeDetails /></Provider>, DRINK_ROUTE);

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteFromLocalStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(favoriteFromLocalStorage);
    expect(favorites).toHaveLength(1);
  });
});
