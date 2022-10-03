import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import DrinksRecommendationCarousel from '../components/DrinksRecommendationCarousel';
import { fetchFoodById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { INGREDIENTS_AND_MEASURE } from '../services/consts';

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

  const handleCrossIngredient = ({ target }) => {
    const ingredientNode = target.parentNode;
    const crossLine = ingredientNode.style.textDecoration;
    const data = localStorage.getItem('inProgressRecipe') ?? id;
    const crossedItems = JSON.parse(data);
    // console.log(ingredientNode.textContent);

    if (crossLine !== 'line-through') {
      ingredientNode.style.textDecoration = 'line-through';
      target.checked = true;
      console.log(crossedItems);
      localStorage
        .setItem('inProgressRecipe', JSON
          .stringify([
            ...crossedItems,
            ingredientNode.textContent,
          ]));
    } else {
      ingredientNode.style.textDecoration = '';
      target.checked = false;
    }
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
              { INGREDIENTS_AND_MEASURE.map((pair, i) => (
                recipe[pair.ingredients] !== null && recipe[pair.ingredients].length > 1
              && (
                <li data-testid={ `${i}-ingredient-name-and-measure` }>
                  <label htmlFor="step" data-testid={ `${i}-ingredient-step` }>
                    <input
                      type="checkbox"
                      id={ `${i}-ingredient-checkbox` }
                      onChange={ handleCrossIngredient }
                    />
                    {` ${recipe[pair.ingredients]} - ${recipe[pair.measure]}  `}
                  </label>
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
