import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const handleInputEmailAndPassword = () => {
      const regexEmail = /\S+@\S+\.\S+/;
      const validateEmail = email.match(regexEmail);
      const passwordLength = 6;
      if (validateEmail && password.length > passwordLength) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    handleInputEmailAndPassword();
  }, [email, password]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          data-testid="email-input"
          onChange={ handleEmailChange }
          value={ email }
          name="email"
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          data-testid="password-input"
          onChange={ handlePasswordChange }
          value={ password }
          name="password"
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
