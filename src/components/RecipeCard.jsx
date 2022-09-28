import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function RecipeCard({ param, index }) {
  // function RecipeCard({ param }, { children }) {
  const { strMeal, strMealThumb, strDrink, strDrinkThumb } = param;

  const { pathname } = useLocation();

  return (
    <div>
      <div id="meal-recipe-card">
        { pathname === '/meals'
          ? (
            <div data-testid={ `${index}-recipe-card` }>
              <div>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                  style={ { width: '150px' } }
                  // Tamanho da imagem limitado
                />
                <p data-testid={ `${index}-card-name` }>
                  { strMeal }
                </p>
              </div>
            </div>)
          : null}
      </div>
      <div id="drinks-div">
        { pathname === '/drinks'
          ? (
            <div>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                  style={ { width: '150px' } }
                  // Tamanho da imagem limitado durante desenvolvimento
                />
                <p data-testid={ `${index}-card-name` }>
                  { strDrink }
                </p>
              </div>
            </div>)
          : null}
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  param: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
