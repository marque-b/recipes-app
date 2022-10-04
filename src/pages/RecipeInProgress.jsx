import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import copy from 'clipboard-copy';
// import DrinksRecommendationCarousel from '../components/DrinksRecommendationCarousel';
import { fetchFoodById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { INGREDIENTS_AND_MEASURE } from '../services/consts';

function FoodRecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyText, setCopyText] = useState('');
  const [favoriteSelected, setFavoriteSelected] = useState(null);
  // const [recipeFinished, setRecipeFinished] = useState(false);
  // const [recipeChecklist, setRecipeChecklist] = useState({
  //  totalIngredients: 0,
  //  checkedIngredients: 0,
  // });

  const history = useHistory();

  const handleFinishRecipe = () => {
    history.push('/done-recipes');
  };

  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  // const handleRecipeCheckList = () => {
  //  const { totalIngredients, checkedIngredients } = recipeChecklist;
  //  if (totalIngredients === checkedIngredients) {
  //    return setRecipeFinished(true);
  //  }
  //  setRecipeFinished(false);
  // };

  // const getRecipeChecklist = (data) => {
  //  let counter = 0;
  //  INGREDIENTS_AND_MEASURE.forEach((pair) => {
  //    if (data[pair.ingredients].length !== undefined
  //      && data[pair.ingredients].length !== 0) {
  //      counter += 1;
  //    }
  //  });
  //  console.log('getRecipeChecklist');
  //  setRecipeChecklist((prevState) => ({ ...prevState, totalIngredients: counter }));
  // };

  const isFavorite = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    const checkResult = favoriteRecipes
      .some((favoriteRecipe) => favoriteRecipe.id === recipe.idMeal);
    return checkResult;
  };

  const copyToClipboard = () => {
    if (recipe.idMeal) {
      // copy(`http://localhost:3000/meals/${id}`);
      window.navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    }
    setCopyText('Link copied!');
  };

  const handleClickFavorites = () => {
    const favorites = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favorites);
    if (isFavorite()) {
      const removeFavorite = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setFavoriteSelected(false);
    } else {
      favoriteRecipes.push({
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavoriteSelected(true);
    }
  };

  useEffect(() => {
    setFavoriteSelected(isFavorite());
    const getRecipe = async () => {
      const data = await fetchFoodById(id);
      setRecipe(data);
      // getRecipeChecklist(data); QUEBRANDO O TESTE
      setLoading(false);
    };
    getRecipe();
  }, []);

  useEffect(() => setFavoriteSelected(isFavorite()));
  // useEffect(() => handleRecipeCheckList(), [recipeChecklist]);

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
              src={ favoriteSelected ? blackHeartIcon : whiteHeartIcon }
            >
              <img
                src={ favoriteSelected ? blackHeartIcon : whiteHeartIcon }
                alt="favorite button"
              />
            </button>
            <p>{ copyText }</p>

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
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
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
              className="button-finish-recipe"
              // disabled={ !recipeFinished }
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

export default FoodRecipeInProgress;
