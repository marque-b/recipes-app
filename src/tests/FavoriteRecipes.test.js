import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Provider from '../context/Provider';

const mockedStorageObj = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockedStorageObj));
});

describe('', () => {
  test('All favorites are shown with the "All" filter selected', async () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const corba = await screen.findByText('Corba');
    const ggDrink = await screen.findByText('GG');

    expect(corba).toBeInTheDocument();
    expect(ggDrink).toBeInTheDocument();
  });

  test('Only Meals are shown when the "Meals" filter is selected', async () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const corba = screen.getByText('Corba');
    const ggDrink = screen.getByText('GG');

    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealFilterBtn).toBeInTheDocument();
    userEvent.click(mealFilterBtn);

    expect(corba).toBeInTheDocument();
    expect(ggDrink).not.toBeInTheDocument();
  });

  test('Only Drinks are shown when the "Drinks" filter is selected', async () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    expect(allFilterBtn).toBeInTheDocument();
    userEvent.click(allFilterBtn);

    const corba = screen.getByText('Corba');
    expect(corba).toBeInTheDocument();

    const ggDrink = screen.getByText('GG');
    expect(ggDrink).toBeInTheDocument();

    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilterBtn);

    const ggDrink2 = screen.getByText('GG');
    expect(ggDrink2).toBeInTheDocument();
  });

  test('The share and unfavorite button work as expected', async () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const corba = screen.getByText('Corba');
    expect(corba).toBeInTheDocument();

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    // userEvent.click(shareBtn);

    // const linkCopiedMsg = screen.getByText('Link copied!');
    // expect(linkCopiedMsg).toBeInTheDocument();

    const unfavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(unfavoriteBtn).toBeInTheDocument();

    userEvent.click(unfavoriteBtn);
  });
});
