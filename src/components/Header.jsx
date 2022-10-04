import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import mealTitleIcon from '../images/mealTitleIcon.svg';
import '../styles/Header.css';

function Header() {
  // Verifica o path para renderizar o título no header
  const path = useHistory().location.pathname;
  const title = () => {
    switch (path) {
    case '/meals':
      return 'MEALS';
    case '/drinks':
      return 'DRINKS';
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
    <header className="header-app">
      <div className="container header-nav">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile pic"
          />
        </Link>
        { (title() === 'MEALS' || title() === 'DRINKS')
        && (
          <Button
            className="search-btn bg-transparent btn-primary-outline"
            type="button"
            onClick={ handleSearchBar }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search pic"
            />
          </Button>)}
      </div>
      <section className="title-section">
        <img src={ mealTitleIcon } alt="" />
        <h1 className="page-title" data-testid="page-title">
          {title()}
        </h1>
      </section>

      {showSearchBar
          && <SearchBar />}
    </header>
  );
}

export default Header;
