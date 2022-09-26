import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DrinksDetails from '../components/DrinksDetails';
import MealsDetails from '../components/MealsDetails';

function RecipeDetails() {
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });

  const APIMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const APIDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      fetch(`${APIMeals}${id}`)
        .then((response) => response.json())
        .then((json) => setRecipes(json));
    } else if (history.location.pathname.includes('drinks')) {
      fetch(`${APIDrinks}${id}`)
        .then((response) => response.json())
        .then((json) => setRecipes(json));
    }
  }, []);

  return (
    <div>
      {history.location.pathname.includes('meals')
        ? <MealsDetails recipe={ recipes.meals[0] } />
        : <DrinksDetails recipe={ recipes.drinks[0] } />}

    </div>
  );
}

export default RecipeDetails;
