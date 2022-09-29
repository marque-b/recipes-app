import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppReceitasContext from '../context/AppReceitasContext';
import MealsRecommendationCarousel from './MealsRecommendationCarousel';
import { INGREDIENTS_AND_MEASURE } from '../services/consts';
import './Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksDetails({ recipe }) {
  const { setRecommendedMeals } = useContext(AppReceitasContext);
  const [recipeStarted, setRecipeStarted] = useState(false);
  const history = useHistory();
  const [copyText, setCopyText] = useState('');
  const [favoriteSelected, setFavoriteSelected] = useState(false);

  const isFavorite = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    return favoriteRecipes.some((favoriteRecipe) => favoriteRecipe.id === recipe.idDrink);
  };

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setRecommendedMeals(json));

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) {
      const inProgressRecipesObject = JSON.parse(inProgressRecipes);
      const started = Object
        .keys(inProgressRecipesObject.drinks).includes(recipe?.idDrink);
      if (started === true) {
        setRecipeStarted(true);
      }
    }
    setFavoriteSelected(isFavorite());
  }, []);

  if (!recipe) return '';

  const handleClickStart = () => {
    history.push(`/drinks/${recipe.idDrink}/in-progress`);
  };

  const copyToClipboard = () => {
    copy(global.location.href);
    setCopyText('Link copied!');
  };

  const handleClickFavorites = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    if (isFavorite()) {
      const removeFavorite = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setFavoriteSelected(false);
    } else {
      favoriteRecipes.push({
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavoriteSelected(true);
    }
  };

  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <button
        data-testid="share-btn"
        type="button"
        className="share-button"
        onClick={ copyToClipboard }
      >
        <img src={ shareIcon } alt="share button" />
      </button>

      <button
        type="button"
        className="favorite-button"
        onClick={ handleClickFavorites }
      >
        <img
          data-testid="favorite-btn"
          alt="heart white or black"
          src={ favoriteSelected ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
      <p>{ copyText }</p>
      <h1
        data-testid="recipe-title"
      >
        {recipe.strDrink}
      </h1>
      <p
        data-testid="recipe-category"
      >
        {recipe.strAlcoholic}
      </p>
      <ul>
        { INGREDIENTS_AND_MEASURE.map((pair, i) => (
          recipe[pair.ingredients] === null
            ? ''
            : (
              <li
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ pair.ingredients }
              >
                {`${recipe[pair.ingredients]} - ${recipe[pair.measure]}  `}
              </li>
            )
        ))}
      </ul>
      <p
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </p>
      <MealsRecommendationCarousel />

      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button-start-recipe"
        onClick={ handleClickStart }
      >
        { recipeStarted
          ? 'Continue Recipe'
          : 'Start Recipe'}
      </button>
    </div>
  );
}

DrinksDetails.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default DrinksDetails;
