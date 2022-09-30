import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import DrinksRecommendationCarousel from '../components/DrinksRecommendationCarousel';
import { fetchFoodById } from '../services';
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

function FoodRecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  useEffect(() => {
    const getRecipe = async () => {
      const data = await fetchFoodById(id);
      setRecipe(data);
      setLoading(false);
    };
    getRecipe();
  }, [id]);

  const handleCrossIngredient = (event) => {
    // text-decoration: line-through;
    console.log(event);
  };

  return (
    <div>
      { loading
        ? <span>Loading</span>
        : (
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
              // onClick={ copyToClipboard }
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
            {/* <p>{ copyText }</p> */}

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
                recipe[pair.ingredients] !== null && recipe[pair.ingredients].length > 1
              && (
                <li data-testid={ `${i}-ingredient-name-and-measure` }>
                  <label htmlFor="step" data-testid={ `${i}-ingredient-step` }>
                    <input
                      type="checkbox"
                      id={ `${i}-ingredient-checkbox` }
                      onChange={ handleCrossIngredient }
                    />
                  </label>
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
            <hr />
            <button
              data-testid="finish-recipe-btn"
              type="button"
              // onClick={ handleClickStart }
            >
              Finish
              {/* { recipeStarted
                ? 'Continue Recipe'
                : 'Start Recipe'} */}
            </button>
          </div>
        )}
    </div>
  );
}

export default FoodRecipeInProgress;
