import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppReceitasContext from '../context/AppReceitasContext';

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

function MealsDetails({ recipe }) {
  const { setRecommendedDrinks } = useContext(AppReceitasContext);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setRecommendedDrinks(json));
  }, []);

  if (!recipe) return '';

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
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
        { ingredientsAndMeasure.map((pair, i) => (
          recipe[pair.ingredients] === ''
            ? ''
            : (
              <li data-testid={ `${i}-ingredient-name-and-measure` }>
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
  }).isRequired,
};

export default MealsDetails;
