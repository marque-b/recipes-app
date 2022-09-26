import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import { EMAIL_INPUT, PASSWORD_INPUT } from '../services/consts';

describe(' Login page', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Check Login page with route /', () => {
    renderWithRouter(<App />);
    const login = screen.getByText('Email');
    expect(login).toBeInTheDocument();
  });

  it('Check Email input', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica Button Entrar', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('Entrar');
    expect(button).toBeInTheDocument();
  });

  it('Check Login Button Enabled or Disabled', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('Entrar');
    expect(button).toBeDisabled();

    const emailInvalid = 'email';
    const passwordInvalid = '1234';
    const emailValid = 'trybe@email.com';
    const passwordValid = '1234567';

    const email1 = screen.getByTestId(EMAIL_INPUT);
    const password1 = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(email1, emailInvalid);
    userEvent.type(password1, passwordInvalid);
    expect(button).toBeDisabled();

    const email2 = screen.getByTestId(EMAIL_INPUT);
    const password2 = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(email2, emailValid);
    userEvent.type(password2, passwordValid);
    expect(button).toBeEnabled();
  });

  it('Checks if clicking on the Enter Button save informations in localStorage and goes to /meals', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByText('Entrar');

    const emailValid = 'trybe@email.com';
    const passwordValid = '1234567';

    userEvent.type(email, emailValid);
    userEvent.type(senha, passwordValid);
    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
