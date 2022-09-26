import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import AppReceitasContext from '../context/AppReceitasContext';

function Meals() {

  const { setRecommendedDrinks } = useContext(AppReceitasContext)
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((json) => setRecommendedDrinks(json));
  },[]);

  return (
    <div>
      Meals
      <Footer />
    </div>
  );
}

export default Meals;
