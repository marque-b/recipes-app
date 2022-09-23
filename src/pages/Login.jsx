import React, { useState, useEffect, useContext } from 'react';
import AppReceitasContext from '../context/AppReceitasContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { user, setUser } = useContext(AppReceitasContext);

  console.log(user);
  console.log(setUser);

  const handleInputEmailAndPassword = () => {
    const regexEmail = /\S+@\S+\.\S+/;
    const validateEmail = email.match(regexEmail);
    const passwordLength = 6;
    console.log(password.length);
    if (validateEmail && password.length > passwordLength) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => handleInputEmailAndPassword(), [email, password]);

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
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
