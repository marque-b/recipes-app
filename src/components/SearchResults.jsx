import React, { useContext } from 'react';
import AppReceitasContext from '../context/AppReceitasContext';
import RecipeCard from './RecipeCard';
import FilterCategories from './FilterCategories';
import '../styles/Recipes.css';

function SearchResults() {
  const { searchResults } = useContext(AppReceitasContext);

  const { meals } = searchResults;
  const { drinks } = searchResults;

  const RESULTS_PER_PAGE = 12;

  return (
    <div>
      <FilterCategories />
      <section id="meal-recipes-section" className="recipes-container">
        { meals !== undefined && meals !== null
          ? meals.slice(0, RESULTS_PER_PAGE)
            .map((meal, i) => <RecipeCard key={ i } param={ meal } index={ i } />)
          : null}
      </section>
      <section id="drinks-recipes-section" className="recipes-container">
        { drinks !== undefined && drinks !== null
          ? drinks.slice(0, RESULTS_PER_PAGE)
            .map((drink, i) => <RecipeCard key={ i } param={ drink } index={ i } />)
          : null}
      </section>
    </div>
  );
}

export default SearchResults;
