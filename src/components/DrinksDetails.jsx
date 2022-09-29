import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppReceitasContext from '../context/AppReceitasContext';
import MealsRecommendationCarousel from './MealsRecommendationCarousel';
import './Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const ingredientsAndMeasure = [
  {
    ingredients: 'strIngredient1',
    measure: 'strMeasure1',
  },
  {
    ingredients: 'strIngredient2',
    measure: 'strMeasure2',
  },
  {
    ingredients: 'strIngredient3',
    measure: 'strMeasure3',
  },
  {
    ingredients: 'strIngredient4',
    measure: 'strMeasure4',
  },
  {
    ingredients: 'strIngredient5',
    measure: 'strMeasure5',
  },
  {
    ingredients: 'strIngredient6',
    measure: 'strMeasure6',
  },
  {
    ingredients: 'strIngredient7',
    measure: 'strMeasure7',
  },
  {
    ingredients: 'strIngredient8',
    measure: 'strMeasure8',
  },
  {
    ingredients: 'strIngredient9',
    measure: 'strMeasure9',
  },
  {
    ingredients: 'strIngredient10',
    measure: 'strMeasure10',
  },
  {
    ingredients: 'strIngredient11',
    measure: 'strMeasure11',
  },
  {
    ingredients: 'strIngredient12',
    measure: 'strMeasure12',
  },
  {
    ingredients: 'strIngredient13',
    measure: 'strMeasure13',
  },
  {
    ingredients: 'strIngredient14',
    measure: 'strMeasure14',
  },
  {
    ingredients: 'strIngredient15',
    measure: 'strMeasure15',
  },
  {
    ingredients: 'strIngredient16',
    measure: 'strMeasure16',
  },
  {
    ingredients: 'strIngredient17',
    measure: 'strMeasure17',
  },
  {
    ingredients: 'strIngredient18',
    measure: 'strMeasure18',
  },
  {
    ingredients: 'strIngredient19',
    measure: 'strMeasure19',
  },
  {
    ingredients: 'strIngredient20',
    measure: 'strMeasure20',
  },
];

function DrinksDetails({ recipe }) {
  const { setRecommendedMeals } = useContext(AppReceitasContext);
  const [recipeStarted, setRecipeStarted] = useState(false);
  const history = useHistory();
  const [copyText, setCopyText] = useState('');

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
  }, []);

  if (!recipe) return '';

  const handleClickStart = () => {
    history.push(`/drinks/${recipe.idDrink}/in-progress`);
  };

  const copyToClipboard = () => {
    copy(global.location.href);
    setCopyText('Link copied!');
  };

  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
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
        data-testid="favorite-btn"
        type="button"
        className="favorite-button"
      >
        <img src={ whiteHeartIcon } alt="favorite button" />
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
        { ingredientsAndMeasure.map((pair, i) => (
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
