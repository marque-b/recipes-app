import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppReceitasContext from '../context/AppReceitasContext';

function FilterCategories() {
  const {
    dinksCategories,
    mealsCategories,
    setSearchResults,
    currentCategoryFilter,
    setCurrentCategoryFilter,
  } = useContext(AppReceitasContext);

  const { pathname } = useLocation();

  const numberOfCategoriesRecipes = 12;

  const handleClickCategoriesFilter = async (categoryName) => {
    setCurrentCategoryFilter(categoryName);

    if (categoryName === currentCategoryFilter) {
      return setSearchResults([]);
    }

    if (!categoryName) {
      return setSearchResults([]);
    }

    if (pathname === '/meals') {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );

      const data = await response.json();
      const firstsCategoriesRecipes = data.meals.slice(
        0,
        numberOfCategoriesRecipes,
      );
      setSearchResults({ meals: firstsCategoriesRecipes });
    }

    if (pathname === '/drinks') {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );

      const data = await response.json();
      const firstsCategoriesDrinks = data.drinks.slice(
        0,
        numberOfCategoriesRecipes,
      );
      setSearchResults({ drinks: firstsCategoriesDrinks });
    }
  };

  return (
    <div>
      <div>
        {pathname === '/meals'
          ? mealsCategories.map((category, is) => (
            <button
              key={ is }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleClickCategoriesFilter(category.strCategory) }
            >
              {category.strCategory}
            </button>
          ))
          : dinksCategories.map((category, i) => (
            <button
              key={ i }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleClickCategoriesFilter(category.strCategory) }
            >
              {category.strCategory}
            </button>
          ))}
      </div>

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClickCategoriesFilter() }
      >
        All
      </button>
    </div>
  );
}

export default FilterCategories;
