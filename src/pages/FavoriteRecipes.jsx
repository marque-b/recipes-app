import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import AppReceitasContext from '../context/AppReceitasContext';

function FavoriteRecipes() {
  const fav = localStorage.getItem('favoriteRecipes');
  const favoriteRecipes = JSON.parse(fav);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [filter, setFilter] = useState('');

  const { favoriteRemoved } = useContext(AppReceitasContext);

  useEffect(() => {
    switch (filter) {
    case 'meal':
      setRecipesToShow(favoriteRecipes.filter((recipe) => recipe.type === 'meal'));
      break;
    case 'drink':
      setRecipesToShow(favoriteRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      setRecipesToShow(favoriteRecipes);
    }
  }, [filter, favoriteRemoved]);

  return (
    <div>
      <Header />
      FavoriteRecipes
      <div>
        { recipesToShow !== null ? recipesToShow.map((meal, i) => (
          <FavoriteRecipesCard key={ i } param={ meal } index={ i } />
        )) : <p>You need to favorite a recipe!</p> }
      </div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Meal
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drink
        </button>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
