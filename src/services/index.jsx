import { NO_RECIPE_FOUND } from './consts';

export async function fetchFoodRecipeByName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  if (data.meals === null) global.alert(NO_RECIPE_FOUND);
  return data;
}

export async function fetchFoodByIngredient(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  if (data.meals === null) global.alert(NO_RECIPE_FOUND);
  return data;
}

export async function fetchFoodByInitialLetter(initial) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${initial}`);
  const data = await response.json();
  if (data.meals === null) global.alert(NO_RECIPE_FOUND);
  return data;
}

export async function fetchDrinkRecipeByName(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  if (data.drinks === null) global.alert(NO_RECIPE_FOUND);
  return data;
}

export async function fetchDrinkByIngredient(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  if (data.drinks === null) global.alert(NO_RECIPE_FOUND);
  return data;
}

export async function fetchDrinkByInitialLetter(initial) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${initial}`);
  const data = await response.json();
  if (data.drinks === null) global.alert(NO_RECIPE_FOUND);
  return data;
}
