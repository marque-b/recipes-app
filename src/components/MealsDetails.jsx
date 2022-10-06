import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppReceitasContext from '../context/AppReceitasContext';
import DrinksRecommendationCarousel from './DrinksRecommendationCarousel';
import { INGREDIENTS_AND_MEASURE } from '../services/consts';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/likeIcon.svg';
import likedIcon from '../images/likedIcon.svg';
import beef from '../images/iconsWithoutText/beef.svg';
import breakfast from '../images/iconsWithoutText/breakfast.svg';
import chicken from '../images/iconsWithoutText/chicken.svg';
import lamb from '../images/iconsWithoutText/lamb.svg';
import dessert from '../images/iconsWithoutText/dessert.svg';
// import ordinaryDrink from '../images/iconsWithoutText/ordinaryDrink.svg';
// import otherUnknown from '../images/iconsWithoutText/otherUnknown.svg';
// import cocoa from '../images/iconsWithoutText/cocoa.svg';
// import shake from '../images/iconsWithoutText/shake.svg';
// import cocktail from '../images/iconsWithoutText/cocktail.svg';
import '../styles/MealsDetails.css';

function MealsDetails({ recipe }) {
  const { setRecommendedDrinks } = useContext(AppReceitasContext);

  const [recipeStarted, setRecipeStarted] = useState(false);
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const checkFavorite = () => {
      const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
      const favoriteRecipes = JSON.parse(favorites);
      const checkResult = favoriteRecipes
        .some((favoriteRecipe) => favoriteRecipe.id === recipe.idMeal);
      if (checkResult) { setIsFavorite(true); } else { setIsFavorite(false); }
    };
    checkFavorite();
  }, [setIsFavorite, recipe.idMeal]);

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
    setFavoriteSelected(isFavorite);
  }, [isFavorite, recipe?.idMeal, setRecommendedDrinks]);

  const handleClickStart = () => {
    history.push(`/meals/${recipe.idMeal}/in-progress`);
  };

  const copyToClipboard = () => {
    copy(global.location.href);
    global.alert('Link copied');
  };

  const handleClickFavorites = () => {
    setIsFavorite(!isFavorite);
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    if (isFavorite) {
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
      <div className="image-container">
        <img
          className="img-fluid recipe-image"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          data-testid="recipe-photo"
        />
        <div className="icons-container">

          {recipe.strCategory === 'Beef' && <img src={ beef } alt="Beef" />}
          {recipe.strCategory === 'Breakfast'
          && <img src={ breakfast } alt="Breakfast" />}
          {recipe.strCategory === 'Chicken'
          && <img src={ chicken } alt="Chicken" />}
          {recipe.strCategory === 'Goat' && <img src={ lamb } alt="Goat" />}
          {recipe.strCategory === 'Dessert'
          && <img src={ dessert } alt="Dessert" />}

          <button
            className="search-btn bg-transparent btn-primary-outline"
            data-testid="share-btn"
            type="button"
            onClick={ copyToClipboard }
          >
            <img src={ shareIcon } alt="share button" />
          </button>

          <button
            className="search-btn bg-transparent btn-primary-outline"
            type="button"
            onClick={ handleClickFavorites }
          >
            <img
              data-testid="favorite-btn"
              alt="heart white or black"
              src={ favoriteSelected ? likedIcon : likeIcon }
            />
          </button>
        </div>

        <h1
          className="recipe-title"
          data-testid="recipe-title"
        >
          {recipe.strMeal}
        </h1>

      </div>

      <ul>
        { INGREDIENTS_AND_MEASURE.map((pair, i) => (
          recipe[pair.ingredients] !== null && recipe[pair.ingredients].length > 1
        && (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
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
