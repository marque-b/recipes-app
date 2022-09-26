import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
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
      break;
    }
  };

  return (
    <header>
      {/* Ícone de perfil */}
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile pic"
      />

      {/* Ícone de pesquisa */}
      { (title() === 'Meals' || title() === 'Drinks')
      && <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search pic"
      /> }

      {/* Título da página */}
      <h1 data-testid="page-title">
        {title()}
      </h1>

      <hr />
    </header>
  );
}

export default Header;
