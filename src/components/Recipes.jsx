import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppReceitasContext from '../context/AppReceitasContext';
import RecipeCard from './RecipeCard';

function Recipes() {
  const {
    meals,
    setMeals,
    drinks,
    setDrinks,
    mealsCategories,
    setMealsCategories,
    dinksCategories,
    setDrinksCategories,
  } = useContext(AppReceitasContext);
  const { pathname } = useLocation();

  const numberOfRecipes = 12;
  const numberOfCategories = 5;

  useEffect(async () => {
    if (pathname === '/meals') {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      const firstsRecipes = data.meals.slice(0, numberOfRecipes);
      setMeals(firstsRecipes);

      const responseCategories = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );
      const dataCategories = await responseCategories.json();
      const categories = dataCategories.meals.slice(0, numberOfCategories);
      setMealsCategories(categories);
    }
    if (pathname === '/drinks') {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      const firstsDrinks = data.drinks.slice(0, numberOfRecipes);
      setDrinks(firstsDrinks);
      const responseCategories = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      const dataCategories = await responseCategories.json();
      const categories = dataCategories.drinks.slice(0, numberOfCategories);
      setDrinksCategories(categories);
    }
  }, []);

  return (
    <div>
      <div>
        {pathname === '/meals'
          ? meals.map((meal, i) => (
            <RecipeCard key={ i } param={ meal } index={ i } />
          ))
          : drinks.map((drink, i) => (
            <RecipeCard key={ i } param={ drink } index={ i } />
          ))}
      </div>

      <div>

        {pathname === '/meals'
          ? mealsCategories.map((category, is) => (
            <button
              key={ is }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          ))
          : dinksCategories.map((category, i) => (
            <button
              key={ i }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          ))}
      </div>

      {/* <button type= "button" data-testid="All-category-filter">
       ALL
      </button> */}
    </div>
  );
}

export default Recipes;
