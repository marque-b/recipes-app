import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppReceitasContext from '../context/AppReceitasContext';
import searchAllIcon from '../images/searchIcons/searchAllIcon.svg';
import '../styles/FilterCategories.css';
import beef from '../images/searchIcons/beef.svg';
import breakfast from '../images/searchIcons/breakfast.svg';
import chicken from '../images/searchIcons/chicken.svg';
import lamb from '../images/searchIcons/lamb.svg';
import dessert from '../images/searchIcons/dessert.svg';

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
    <div className="categories-container">
      <button
        className="search-btn bg-transparent btn-primary-outline"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClickCategoriesFilter() }
      >
        <img src={ searchAllIcon } alt="Search all categories" />
      </button>
      {pathname === '/meals'
        ? mealsCategories.map((category, is) => (
          <button
            className="search-btn bg-transparent btn-primary-outline"
            key={ is }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClickCategoriesFilter(category.strCategory) }
          >
            {category.strCategory === 'Beef' && <img src={ beef } alt="Beef" />}
            {category.strCategory === 'Breakfast'
            && <img src={ breakfast } alt="Breakfast" />}
            {category.strCategory === 'Chicken'
            && <img src={ chicken } alt="Chicken" />}
            {category.strCategory === 'Goat' && <img src={ lamb } alt="Goat" />}
            {category.strCategory === 'Dessert'
            && <img src={ dessert } alt="Dessert" />}
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
  );
}

export default FilterCategories;
