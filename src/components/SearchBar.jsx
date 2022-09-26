import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppReceitasContext from '../context/AppReceitasContext';
import { fetchFoodRecipeByName, fetchFoodByIngredient,
  fetchFoodByInitialLetter, fetchDrinkRecipeByName,
  fetchDrinkByIngredient, fetchDrinkByInitialLetter } from '../services/index';

function SearchBar() {
  const { setSearchResults } = useContext(AppReceitasContext);

  const [searchInput, setSearchInput] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('');

  const { pathname } = useLocation();

  const executeSearch = async () => {
    if (typeOfSearch === 'first-letter-search' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    switch (`${pathname} ${typeOfSearch}`) {
    case '/meals name-search':
      setSearchResults(await fetchFoodRecipeByName(searchInput));
      break;
    case '/meals ingredient-search':
      setSearchResults(await fetchFoodByIngredient(searchInput));
      break;
    case '/meals first-letter-search':
      setSearchResults(await fetchFoodByInitialLetter(searchInput));
      break;
    case '/drinks name-search':
      setSearchResults(await fetchDrinkRecipeByName(searchInput));
      break;
    case '/drinks ingredient-search':
      setSearchResults(await fetchDrinkByIngredient(searchInput));
      break;
    case '/drinks first-letter-search':
      setSearchResults(await fetchDrinkByInitialLetter(searchInput));
      break;
    default:
      global.alert('The search input and type of search must be filled');
      break;
    }
  // }
  };

  return (
    <div>
      <label htmlFor="search-bar">
        Search recipes:
        <input
          type="text"
          id="search-bar"
          onChange={ ({ target }) => setSearchInput(target.value) }
        />
      </label>
      <label htmlFor="ingredient-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
          value="ingredient-search"
          name="search-bar"
          onChange={ ({ target }) => setTypeOfSearch(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="name-search">
        <input
          type="radio"
          id="name-search"
          data-testid="name-search-radio"
          value="name-search"
          name="search-bar"
          onChange={ ({ target }) => setTypeOfSearch(target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter-search">
        <input
          type="radio"
          id="first-letter-search"
          data-testid="first-letter-search-radio"
          value="first-letter-search"
          name="search-bar"
          onChange={ ({ target }) => setTypeOfSearch(target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ executeSearch }
      >
        Find
      </button>
    </div>
  );
}

export default SearchBar;
