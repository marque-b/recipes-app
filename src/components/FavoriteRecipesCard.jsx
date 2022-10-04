import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppReceitasContext from '../context/AppReceitasContext';

function FavoriteRecipesCard({ param, index }) {
  const [copyText, setCopyText] = useState('');

  const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
  const favoriteRecipes = JSON.parse(favorites);

  const { setFavoriteRemoved } = useContext(AppReceitasContext);

  const handleClickFavorites = () => {
    const removeFavorite = favoriteRecipes
      .filter((favoriteRecipe) => favoriteRecipe.id !== param.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    setFavoriteRemoved(favoriteRecipes);
  };

  const { id, name, nationality, image,
    doneDate, category, type, alcoholicOrNot } = param;

  const copyToClipboard = () => {
    switch (type) {
    case 'meal':
      copy(`http://localhost:3000/meals/${id}`);
      break;
    case 'drink':
      copy(`http://localhost:3000/drinks/${id}`);
      break;
    default:
      break;
    }
    setCopyText('Link copied!');
  };

  return (
    <div>
      <div id="meal-recipe-card">
        <div data-testid={ `${index}-recipe-card` }>
          <Link to={ `/${type}s/${id}` }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '150px' } }
              // Tamanho da imagem limitado
            />

            <p data-testid={ `${index}-horizontal-name` }>
              { name }
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>

            { `${nationality} - ${category} ` }
            { type === 'drink' && alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { doneDate }
          </p>
          <p>{ copyText }</p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            className="share-button"
            src={ shareIcon }
            alt="share button"
            onClick={ copyToClipboard }
          >
            <img
              src={ shareIcon }
              alt="share button"
            />
          </button>

          <button
            type="button"
            className="favorite-button"
            onClick={ handleClickFavorites }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="heart white or black"
              src={ blackHeartIcon }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  param: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipesCard;
