import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import AppReceitasContext from '../context/AppReceitasContext';
import './RecommendationCarousel.css';

function MealsRecommendationCarousel() {
  const { recommendedMeals } = useContext(AppReceitasContext);
  if (!recommendedMeals.meals || recommendedMeals.meals.length === 0) return '';
  const numberLimit = 6;
  const top6RecommendedMeals = recommendedMeals.meals.slice(0, numberLimit);

  return (
    <Carousel>
      <Carousel.Item>
        <div className="recommendation-pair">

          <div
            className="recommendation-individual-card"
            data-testid="0-recommendation-card"
          >
            <img
              src={ top6RecommendedMeals[0].strMealThumb }
              alt={ top6RecommendedMeals[0].strMeal }
            />
            <h1
              data-testid="0-recommendation-title"
            >
              {top6RecommendedMeals[0].strMeal}
            </h1>
          </div>

          <div
            className="recommendation-individual-card"
            data-testid="1-recommendation-card"
          >
            <img
              src={ top6RecommendedMeals[1].strMealThumb }
              alt={ top6RecommendedMeals[1].strMeal }
            />
            <h1
              data-testid="1-recommendation-title"
            >
              {top6RecommendedMeals[1].strMeal}
            </h1>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="recommendation-pair">

          <div
            className="recommendation-individual-card"
            data-testid="2-recommendation-card"
          >
            <img
              src={ top6RecommendedMeals[2].strMealThumb }
              alt={ top6RecommendedMeals[2].strMeal }
            />
            <h1
              data-testid="2-recommendation-title"
            >
              {top6RecommendedMeals[2].strMeal}
            </h1>
          </div>

          <div
            className="recommendation-individual-card"
            data-testid="3-recommendation-card"
          >
            <img
              src={ top6RecommendedMeals[3].strMealThumb }
              alt={ top6RecommendedMeals[3].strMeal }
            />
            <h1
              data-testid="3-recommendation-title"
            >
              {top6RecommendedMeals[3].strMeal}
            </h1>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="recommendation-pair">

          <div
            className="recommendation-individual-card"
            data-testid="4-recommendation-card"
          >
            <img
              src={ top6RecommendedMeals[4].strMealThumb }
              alt={ top6RecommendedMeals[4].strMeal }
            />
            <h1
              data-testid="4-recommendation-title"
            >
              {top6RecommendedMeals[4].strMeal}
            </h1>
          </div>

          <div
            className="recommendation-individual-card"
            data-testid="5-recommendation-card"
          >
            <img
              src={ top6RecommendedMeals[5].strMealThumb }
              alt={ top6RecommendedMeals[5].strMeal }
            />
            <h1
              data-testid="5-recommendation-title"
            >
              {top6RecommendedMeals[5].strMeal}
            </h1>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default MealsRecommendationCarousel;
