import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const emailLocalStorage = JSON.parse(localStorage.getItem('user'))?.email;

  return (
    <div>
      <Header />
      Profile
      <p data-testid="profile-email">{emailLocalStorage }</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ handleDoneRecipes }
      >
        Done Recipes
        {' '}
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ handleFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
