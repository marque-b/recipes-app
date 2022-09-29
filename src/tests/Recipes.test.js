import React from 'react';
import { screen } from '@testing-library/react';
import allDrinks from './mocks/allDrinks.json';
import allMeals from './mocks/allMeals.json';
import renderWithRouter from './helper/renderWithRouter';
import Recipes from '../components/Recipes';
import Provider from '../context/Provider';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa tela drinks', () => {
  it('Verifica quantidade de drinks na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(allDrinks),
    }));
    renderWithRouter(
      <Provider>
        <Recipes />
      </Provider>,
      '/drinks',
    );

    const cards = await screen.findAllByTestId(/-recipe-card/i);
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(cards.length).toEqual(12);
  });
});

describe('Testa tela meals', () => {
  it('Verifica quantidade de meals na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(allMeals),
    }));
    renderWithRouter(
      <Provider>
        <Recipes />
      </Provider>,
      '/meals',
    );

    const cards = await screen.findAllByTestId(/-recipe-card/i);
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(cards.length).toEqual(12);
  });
});
