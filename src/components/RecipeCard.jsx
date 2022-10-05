import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import '../styles/RecipeCard.css';

function RecipeCard({ param, index }) {
  const { strMeal, strMealThumb, strDrink, strDrinkThumb, idMeal, idDrink } = param;

  const { pathname } = useLocation();

  const history = useHistory();

  const handleCardClick = (id, path) => {
    history.push(`/${path}/${id}`);
  };

  return (
    <div id="meal-recipe-card">
      <div>
        {pathname === '/meals' && (
          <button
            className="search-btn bg-transparent btn-primary-outline"
            type="button"
            onClick={ () => handleCardClick(idMeal, 'meals') }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <div className="card custom-card">
                <img
                  className="card-img-top card-image"
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  className="card-text recipe-title"
                  data-testid={ `${index}-card-name` }
                >
                  {strMeal}
                </p>
              </div>
            </div>
          </button>
        )}
      </div>
      <div id="drinks-div">
        {pathname === '/drinks' && (
          <button
            className="search-btn bg-transparent btn-primary-outline"
            type="button"
            onClick={ () => handleCardClick(idDrink, 'drinks') }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <div className="card custom-card">
                <img
                  className="card-img-top card-image"
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  className="card-text recipe-title"
                  data-testid={ `${index}-card-name` }
                >
                  {strDrink}
                </p>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  param: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
