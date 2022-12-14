import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import AppReceitasContext from '../context/AppReceitasContext';
import { fetchFoodRecipeByName, fetchFoodByIngredient,
  fetchFoodByInitialLetter, fetchDrinkRecipeByName,
  fetchDrinkByIngredient, fetchDrinkByInitialLetter } from '../services/index';
import '../styles/SearchBar.css';

function SearchBar() {
  const { searchResults, setSearchResults } = useContext(AppReceitasContext);

  const [searchInput, setSearchInput] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const { drinks } = searchResults;
    if (drinks !== undefined && drinks !== null && drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
  }, [history, searchResults]);

  useEffect(() => {
    const { meals } = searchResults;
    if (meals !== undefined && meals !== null && meals.length === 1) {
      history.push(`/meals/${meals[0].idMeal}`);
    }
  }, [searchResults, history]);

  const executeSearch = async () => {
    setLoading(true);
    if (typeOfSearch === 'first-letter-search' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    switch (`${pathname} ${typeOfSearch}`) {
    case '/meals name-search':
      setSearchResults(await fetchFoodRecipeByName(searchInput));
      setLoading(false);
      break;
    case '/meals ingredient-search':
      setSearchResults(await fetchFoodByIngredient(searchInput));
      setLoading(false);
      break;
    case '/meals first-letter-search':
      setSearchResults(await fetchFoodByInitialLetter(searchInput));
      setLoading(false);
      break;
    case '/drinks name-search':
      setSearchResults(await fetchDrinkRecipeByName(searchInput));
      setLoading(false);
      break;
    case '/drinks ingredient-search':
      setSearchResults(await fetchDrinkByIngredient(searchInput));
      setLoading(false);
      break;
    case '/drinks first-letter-search':
      setSearchResults(await fetchDrinkByInitialLetter(searchInput));
      setLoading(false);
      break;
    default:
      global.alert('The search input and type of search must be filled');
      break;
    }
  };

  return (
    <div className="search-container">
      { loading
        ? <span>Loading</span>
        : (
          <div className="inputs-container">
            <label className="search-input" htmlFor="search-bar">
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                value={ searchInput }
                id="search-bar"
                data-testid="search-input"
                onChange={ ({ target }) => setSearchInput(target.value) }
              />
            </label>
            <div className="search-radio-container">
              <label className="search-radio-input" htmlFor="ingredient-search">
                <input
                  className="search-radio-input"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  id="ingredient-search"
                  value="ingredient-search"
                  name="search-bar"
                  onChange={ ({ target }) => setTypeOfSearch(target.value) }
                />
                Ingredient
              </label>
              <label className="search-radio-input" htmlFor="name-search">
                <input
                  className="search-radio-input"
                  type="radio"
                  id="name-search"
                  data-testid="name-search-radio"
                  value="name-search"
                  name="search-bar"
                  onChange={ ({ target }) => setTypeOfSearch(target.value) }
                />
                Name
              </label>
              <label className="search-radio-input" htmlFor="first-letter-search">
                <input
                  className="search-radio-input"
                  type="radio"
                  id="first-letter-search"
                  data-testid="first-letter-search-radio"
                  value="first-letter-search"
                  name="search-bar"
                  onChange={ ({ target }) => setTypeOfSearch(target.value) }
                />
                First letter
              </label>
            </div>
            <Button
              className="exec-search-btn btn-sm"
              type="button"
              data-testid="exec-search-btn"
              onClick={ executeSearch }
            >
              Search
            </Button>
          </div>
        )}
    </div>
  );
}

export default SearchBar;
