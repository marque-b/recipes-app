import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

function RecipeCard({ param, index }) {
  const { strMeal, strMealThumb, strDrink, strDrinkThumb, idMeal, idDrink } = param;

  const { pathname } = useLocation();

  const history = useHistory();

  const handleCardClick = (id, path) => {
    history.push(`/${path}/${id}`);
  };

  return (
    <div>
      <div id="meal-recipe-card">
        {pathname === '/meals' ? (
          <div>
            <button
              type="button"
              onClick={ () => handleCardClick(idMeal, 'meals') }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <div>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${index}-card-img` }
                    style={ { width: '150px' } }
                    // Tamanho da imagem limitado
                  />
                  <p data-testid={ `${index}-card-name` }>{strMeal}</p>
                </div>
              </div>
            </button>
          </div>
        ) : null}
      </div>
      <div id="drinks-div">
        {pathname === '/drinks' ? (
          <div>
            <button
              type="button"
              onClick={ () => handleCardClick(idDrink, 'drinks') }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                  style={ { width: '150px' } }
                />
                <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              </div>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  param: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
