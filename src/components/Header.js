import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  // Verifica o path para renderizar o título no header
  const path = useHistory().location.pathname;
  const title = () => {
    switch (path) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
    }
  };

  // Habilita e desabilita a Search Bar
  const [showSearchBar, setShowSearchBar] = useState(false);
  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header>
      {/* Ícone de perfil */}
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile pic"
        />
      </Link>

      {/* Ícone de pesquisa */}
      { (title() === 'Meals' || title() === 'Drinks')
      && (
        <button
          type="button"
          onClick={ handleSearchBar }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search pic"
          />
        </button>)}

      {/* Título da página */}
      <h1 data-testid="page-title">
        {title()}
      </h1>

      {showSearchBar
          && <SearchBar />}

      <hr />
    </header>
  );
}

export default Header;
