import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('tests done recipes page', () => {
  const recipeTag = '1-recipe-card';
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  it('should have recipes on screen', () => {
    renderWithRouter(<DoneRecipes />);
    const recipe = screen.getByTestId('0-recipe-card');
    const recipe2 = screen.getByTestId(recipeTag);
    expect(recipe).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });
  it('should only show recipes of the selected filter', () => {
    renderWithRouter(<DoneRecipes />);
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    const allButton = screen.getByTestId('filter-by-all-btn');
    const recipe = screen.getByTestId('0-recipe-card');
    const recipe2 = screen.getByTestId(recipeTag);

    userEvent.click(mealButton);
    expect(recipe).toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();

    userEvent.click(allButton);
    const recipe2AfterClick = screen.getByTestId(recipeTag);
    expect(recipe).toBeInTheDocument();
    expect(recipe2AfterClick).toBeInTheDocument();

    userEvent.click(drinkButton);
    expect(recipe).toBeInTheDocument();
    expect(recipe2AfterClick).not.toBeInTheDocument();
  });
  it('should have a working share button', async () => {
    renderWithRouter(<DoneRecipes />);
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
  });
});
