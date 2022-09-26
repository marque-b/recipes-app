import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppReceitasContext from './AppReceitasContext';

function Provider({ children }) {
  const [user, setUser] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const contextValue = {
    user,
    setUser,
    meals,
    setMeals,
    drinks,
    setDrinks,
    searchResults,
    setSearchResults,
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
