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

// export async function fetchFoodById(id) {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Number(id)}`);
//   const data = await response.json();
//   const recipe = data.meals[0];
//   const cleanRecipe = Object.entries(recipe);
//   cleanRecipe.forEach((arr) => arr.map((value) => {
//     if (value === '') value.replace('', null);
//     return value;
//   }));
//   console.log(cleanRecipe);
//   return data.meals[0];
// }

export async function fetchFoodById(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Number(id)}`);
  const data = await response.json();
  return data.meals[0];
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

export async function fetchDrinkById(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks[0];
}
