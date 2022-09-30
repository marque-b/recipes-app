import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DrinksDetails from '../components/DrinksDetails';
import MealsDetails from '../components/MealsDetails';

function RecipeDetails() {
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const APIMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const APIDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      fetch(`${APIMeals}${id}`)
        .then((response) => response.json())
        .then((json) => setRecipes(json))
        .then(() => setIsLoading(false));
    } else {
      fetch(`${APIDrinks}${id}`)
        .then((response) => response.json())
        .then((json) => setRecipes(json))
        .then(() => setIsLoading(false));
    }
  }, [history.location.pathname, id]);

  if (isLoading === true) {
    return <p>Loading</p>;
  }
  return history.location.pathname.includes('meals')
    ? <MealsDetails recipe={ recipes.meals[0] } />
    : <DrinksDetails recipe={ recipes.drinks[0] } />;
}

export default RecipeDetails;
