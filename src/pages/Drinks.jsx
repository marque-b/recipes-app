import React, { useContext } from 'react';
import AppReceitasContext from '../context/AppReceitasContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import Recipes from '../components/Recipes';

function Drinks() {
  const { searchResults } = useContext(AppReceitasContext);
  return (
    <div>
      <Header />
      {searchResults.drinks?.length ? <SearchResults /> : <Recipes /> }
      <Footer />
    </div>
  );
}

export default Drinks;
