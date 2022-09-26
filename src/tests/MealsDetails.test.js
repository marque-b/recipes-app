import React from 'react';
import { screen } from '@testing-library/react';
import allMeals from './mocks/allMeals.json';
import renderWithRouter from './helper/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import Provider from '../context/Provider';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(allMeals),
  }));
});

describe('Testa requisição da API', () => {
  it('Verifica requisição da API', async () => {
    renderWithRouter(<Provider><RecipeDetails /></Provider>, '/meals/52977');

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const drinkGG = await screen.findByTestId('recipe-photo');

    expect(drinkGG).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
});
