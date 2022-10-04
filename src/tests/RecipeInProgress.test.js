import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const INGREDIENT_STEP = '0-ingredient-step';
const INSTRUCTIONS = 'instructions';
const FINISH_RECIPE_BTN = 'finish-recipe-btn';
const FAVORITE_BTN = 'favorite-btn';
const SHARE_BTN = 'share-btn';
const MEAL_URL = '/meals/52771/in-progress';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(oneMeal),
  });
});

describe(('Food recipe in progress page test'), () => {
  it(('The recipe specs are rendered'), async () => {
    renderWithRouter(<App />, MEAL_URL);

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
    renderWithRouter(<App />, MEAL_URL);

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
      const shareBtn = screen.getByTestId(SHARE_BTN);

      expect(favoriteBtn).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();

      userEvent.click(favoriteBtn);
      userEvent.click(favoriteBtn);
    });
  });

  test('Steps are checked with a click, finish button redirects', async () => {
    renderWithRouter(<App />, MEAL_URL);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      const finishBtn = screen.getByTestId(FINISH_RECIPE_BTN);

      userEvent.click(checkboxes[0]);
      userEvent.click(checkboxes[0]);
      userEvent.click(checkboxes[1]);
      userEvent.click(finishBtn);
    });
  });

  it('Share button copies the recipe url', async () => {
    renderWithRouter(<App />, MEAL_URL);

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    await waitFor(() => {
      const shareBtn = screen.getByTestId(SHARE_BTN);

      userEvent.click(shareBtn);
      expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
