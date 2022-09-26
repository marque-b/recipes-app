import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import AppReceitasContext from '../context/AppReceitasContext';
import './RecommendationCarousel.css';

function DrinksRecommendationCarousel() {
  const { recommendedDrinks } = useContext(AppReceitasContext);
  if (!recommendedDrinks.drinks) return '';
  const numberLimit = 6;
  const top6RecommendedDrinks = recommendedDrinks.drinks.slice(0, numberLimit);

  return (
    <Carousel>
      <Carousel.Item>
        <div className="recommendation-pair">

          <div
            className="recommendation-individual-card"
            data-testid="0-recommendation-card"
          >
            <img
              src={ top6RecommendedDrinks[0].strDrinkThumb }
              alt={ top6RecommendedDrinks[0].strDrink }
            />
            <h1
              data-testid="0-recommendation-title"
            >
              {top6RecommendedDrinks[0].strDrink}
            </h1>
          </div>

          <div
            className="recommendation-individual-card"
            data-testid="1-recommendation-card"
          >
            <img
              src={ top6RecommendedDrinks[1].strDrinkThumb }
              alt={ top6RecommendedDrinks[1].strDrink }
            />
            <h1
              data-testid="1-recommendation-title"
            >
              {top6RecommendedDrinks[1].strDrink}
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
              src={ top6RecommendedDrinks[2].strDrinkThumb }
              alt={ top6RecommendedDrinks[2].strDrink }
            />
            <h1
              data-testid="2-recommendation-title"
            >
              {top6RecommendedDrinks[2].strDrink}
            </h1>
          </div>

          <div
            className="recommendation-individual-card"
            data-testid="3-recommendation-card"
          >
            <img
              src={ top6RecommendedDrinks[3].strDrinkThumb }
              alt={ top6RecommendedDrinks[3].strDrink }
            />
            <h1
              data-testid="3-recommendation-title"
            >
              {top6RecommendedDrinks[3].strDrink}
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
              src={ top6RecommendedDrinks[4].strDrinkThumb }
              alt={ top6RecommendedDrinks[4].strDrink }
            />
            <h1
              data-testid="4-recommendation-title"
            >
              {top6RecommendedDrinks[4].strDrink}
            </h1>
          </div>

          <div
            className="recommendation-individual-card"
            data-testid="5-recommendation-card"
          >
            <img
              src={ top6RecommendedDrinks[5].strDrinkThumb }
              alt={ top6RecommendedDrinks[5].strDrink }
            />
            <h1
              data-testid="5-recommendation-title"
            >
              {top6RecommendedDrinks[5].strDrink}
            </h1>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default DrinksRecommendationCarousel;
