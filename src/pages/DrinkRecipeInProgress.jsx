import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import copy from 'clipboard-copy';
// import DrinksRecommendationCarousel from '../components/DrinksRecommendationCarousel';
import { fetchDrinkById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import likedIcon from '../images/likedIcon.svg';
import likeIcon from '../images/likeIcon.svg';
import { INGREDIENTS_AND_MEASURE } from '../services/consts';

function DrinkRecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyText, setCopyText] = useState('');
  const [favoriteSelected, setFavoriteSelected] = useState(null);

  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  const history = useHistory();

  const handleFinishRecipe = () => {
    history.push('/done-recipes');
  };

  const isFavorite = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    const checkResult = favoriteRecipes
      .some((favoriteRecipe) => favoriteRecipe.id === recipe.idDrink);
    return checkResult;
  };

  const copyToClipboard = () => {
    if (recipe.idDrink) {
      // copy(`http://localhost:3000/drinks/${id}`);
      window.navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    }
    setCopyText('Link copied!');
  };

  const handleClickFavorites = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    if (isFavorite()) {
      const removeFavorite = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setFavoriteSelected(false);
    } else {
      favoriteRecipes.push({
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavoriteSelected(true);
    }
  };

  useEffect(() => {
    setFavoriteSelected(isFavorite());
    const getRecipe = async () => {
      const data = await fetchDrinkById(id);
      setRecipe(data);
      setLoading(false);
    };
    getRecipe();
  }, [id]);

  useEffect(() => setFavoriteSelected(isFavorite()));

  const handleCrossIngredient = ({ target }) => {
    const ingredientNode = target.parentNode;
    const crossLine = ingredientNode.style.textDecoration;
    if (crossLine !== 'line-through') {
      ingredientNode.style.textDecoration = 'line-through';
    } else {
      ingredientNode.style.textDecoration = '';
    }
  };

  return (
    <div>
      { loading
        ? <span>Loading</span>
        : (
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
              src={ shareIcon }
              onClick={ copyToClipboard }
            >
              <img src={ shareIcon } alt="share button" />
            </button>

            <button
              data-testid="favorite-btn"
              type="button"
              className="favorite-button"
              onClick={ () => handleClickFavorites() }
              src={ favoriteSelected ? likedIcon : likeIcon }
            >
              <img
                src={ favoriteSelected ? likedIcon : likeIcon }
                alt="favorite button"
              />
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
              {recipe.strCategory}
            </p>
            <ul>
              { INGREDIENTS_AND_MEASURE.map((pair, i) => (
                recipe[pair.ingredients] !== null
                && recipe[pair.ingredients] !== undefined
                && recipe[pair.ingredients].length > 1
                && (
                  <li data-testid={ `${i}-ingredient-name-and-measure` }>
                    <label
                      htmlFor={ `${i}-ingredient-checkbox` }
                      data-testid={ `${i}-ingredient-step` }
                    >
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
              // src={ `${recipe.strVideo.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}` }
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
              onClick={ handleFinishRecipe }
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

export default DrinkRecipeInProgress;
