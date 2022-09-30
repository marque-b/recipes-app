import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const INGREDIENT_STEP = '0-ingredient-step';
const INSTRUCTIONS = 'instructions';
const FINISH_RECIPE_BTN = 'finish-recipe-btn';
const FAVORITE_BTN = 'favorite-btn';
const SHARE_BTN = 'share-btn';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(oneDrink),
  });
});

describe(('Food recipe in progress page test'), () => {
  it(('The recipe specs are rendered'), async () => {
    renderWithRouter(<App />, '/drinks/178319/in-progress');

    await waitFor(() => {
      const recipeImg = screen.getByTestId(RECIPE_PHOTO);
      const recipeTitle = screen.getByTestId(RECIPE_TITLE);
      const ingredientStep = screen.getByTestId(INGREDIENT_STEP);
      const instructions = screen.getByTestId(INSTRUCTIONS);
      const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN);

      expect(recipeImg).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(ingredientStep).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(finishRecipeBtn).toBeInTheDocument();
    });
  });

  it(('Favorite and Share buttons are rendered'), async () => {
    renderWithRouter(<App />, '/drinks/178319/in-progress');

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
      const shareBtn = screen.getByTestId(SHARE_BTN);

      expect(favoriteBtn).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
    });
  });
});
