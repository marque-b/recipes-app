import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppReceitasContext from './AppReceitasContext';

function Provider({ children }) {
  const [user, setUser] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedDrinks, setRecommendedDrinks] = useState({ drinks: [] });
  const [recommendedMeals, setRecommendedMeals] = useState({ meals: [] });
  const [mealsCategories, setMealsCategories] = useState([]);
  const [dinksCategories, setDrinksCategories] = useState([]);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState([]);

  const contextValue = {
    user,
    setUser,
    meals,
    setMeals,
    drinks,
    setDrinks,
    searchResults,
    setSearchResults,
    recommendedDrinks,
    setRecommendedDrinks,
    recommendedMeals,
    setRecommendedMeals,
    mealsCategories,
    setMealsCategories,
    dinksCategories,
    setDrinksCategories,
    currentCategoryFilter,
    setCurrentCategoryFilter,
  };

  return (
    <AppReceitasContext.Provider value={ contextValue }>
      { children }
    </AppReceitasContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
