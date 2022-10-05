import React from 'react';
import { Link } from 'react-router-dom';
import drinkTitleIcon from '../images/drinkTitleIcon.svg';
import mealTitleIcon from '../images/mealTitleIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link
        to="/drinks"
      >
        <img
          src={ drinkTitleIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link
        to="/meals"
      >
        <img
          src={ mealTitleIcon }
          alt="meal icon"
          data-testid="meals-bottom-btn"
        />
      </Link>

    </footer>
  );
}

export default Footer;
