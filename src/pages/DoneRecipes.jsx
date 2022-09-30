import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const done = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(done);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    switch (filter) {
    case 'meal':
      setRecipesToShow(doneRecipes.filter((recipe) => recipe.type === 'meal'));
      break;
    case 'drink':
      setRecipesToShow(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      setRecipesToShow(doneRecipes);
    }
  }, [filter]);

  return (
    <div>
      <Header />
      DoneRecipes
      <div>
        { recipesToShow !== null ? recipesToShow.map((meal, i) => (
          <DoneRecipeCard key={ i } param={ meal } index={ i } />
        )) : <p>You need to finish a recipe!</p> }
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

export default DoneRecipes;
