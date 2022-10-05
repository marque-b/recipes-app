import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col } from 'react-bootstrap';
import '../styles/Login.css';

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
    <Container className="loginScreen">
      <div className="loginContainer">
        <Col>
          <label htmlFor="email" className="loginInput">
            <input
              className="loginInput"
              type="email"
              data-testid="email-input"
              placeholder="Email"
              onChange={ handleEmailChange }
              value={ email }
              name="email"
            />
          </label>
          <label htmlFor="password" className="loginInput">
            <input
              className="loginInput"
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              onChange={ handlePasswordChange }
              value={ password }
              name="password"
            />
          </label>
          <Button
            className="submitLogin"
            size="lg"
            variant="warning"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ buttonDisabled }
            onClick={ handleClick }
          >
            Entrar
          </Button>
        </Col>
      </div>
    </Container>
  );
}

export default Login;
