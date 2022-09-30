import React from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const done = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(done);
  return (
    <div>
      <Header />
      DoneRecipes
      <div>
        { doneRecipes !== null ? doneRecipes.map((meal, i) => (
          <DoneRecipeCard key={ i } param={ meal } index={ i } />
        )) : <p>Hello</p> }
      </div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meal
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
    </div>
  );
}

export default DoneRecipes;
