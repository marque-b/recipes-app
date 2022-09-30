import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ param, index }) {
  const [copyText, setCopyText] = useState('');
  const { id, name, nationality, tags, image,
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
          <div>
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
            <p data-testid={ `${index}-horizontal-top-text` }>

              { `${nationality} - ${category} ` }
              { type === 'drink' && alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { doneDate }
            </p>
          </div>
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

          <div>
            { tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  param: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
