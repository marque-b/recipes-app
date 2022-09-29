import React from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

function RecipeCard({ param, index }) {
  // function RecipeCard({ param }, { children }) {
  const { strMeal, strMealThumb, strDrink, strDrinkThumb } = param;

  // const { pathname } = useLocation();

  return (
    <div>
      <div id="meal-recipe-card">
        <div data-testid={ `${index}-recipe-card` }>
          <div>
            <img
              src={ strMealThumb !== undefined ? strMealThumb : strDrinkThumb }
              alt={ strMeal !== undefined ? strMeal : strDrink }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
              // Tamanho da imagem limitado
            />
            <p data-testid={ `${index}-card-name` }>
              { strMeal !== undefined ? strMeal : strDrink }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  param: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
