import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppReceitasContext from '../context/AppReceitasContext';
import DrinksRecommendationCarousel from './DrinksRecommendationCarousel';
import { INGREDIENTS_AND_MEASURE } from '../services/consts';
import './Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function MealsDetails({ recipe }) {
  const { setRecommendedDrinks } = useContext(AppReceitasContext);
  const [recipeStarted, setRecipeStarted] = useState(false);
  const history = useHistory();
  const [copyText, setCopyText] = useState('');
  const [favoriteSelected, setFavoriteSelected] = useState(false);

  const isFavorite = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    return favoriteRecipes.some((favoriteRecipe) => favoriteRecipe.id === recipe.idMeal);
  };

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setRecommendedDrinks(json));

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) {
      const inProgressRecipesObject = JSON.parse(inProgressRecipes);
      const started = Object
        .keys(inProgressRecipesObject.meals).includes(recipe?.idMeal);
      if (started === true) {
        setRecipeStarted(true);
      }
    }
    setFavoriteSelected(isFavorite());
  }, []);

  // if (!recipe) return '';

  const handleClickStart = () => {
    history.push(`/meals/${recipe.idMeal}/in-progress`);
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
        .filter((favoriteRecipe) => favoriteRecipe.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setFavoriteSelected(false);
    } else {
      favoriteRecipes.push({
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavoriteSelected(true);
    }
  };

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
        style={ { height: '360px' } }
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
        {recipe.strMeal}
      </h1>
      <p
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </p>
      <ul>
        { INGREDIENTS_AND_MEASURE.map((pair, i) => (
          recipe[pair.ingredients] !== null && recipe[pair.ingredients].length > 1
        && (
          <li data-testid={ `${i}-ingredient-name-and-measure` }>
            {` ${recipe[pair.ingredients]} - ${recipe[pair.measure]}  `}
          </li>)
        ))}
      </ul>
      <p
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </p>

      <iframe
        data-testid="video"
        src={ `${recipe.strYoutube.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}` }
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      <DrinksRecommendationCarousel />
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

MealsDetails.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
};

export default MealsDetails;
