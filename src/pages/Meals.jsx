import React, { useContext } from 'react';
import AppReceitasContext from '../context/AppReceitasContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchResults from '../components/SearchResults';

function Meals() {
  const { searchResults } = useContext(AppReceitasContext);

  return (
    <div>
      <Header />
      {searchResults.meals?.length ? <SearchResults /> : <Recipes /> }
      <Footer />
    </div>
  );
}

export default Meals;
