import React, { useState } from 'react';

type FormProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Form({ handleClick }: FormProps) {
  const [formData, setFormData] = useState({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  function validateServiceName(serviceName: string) {
    if (serviceName) return true;
  }

  function validateLogin(login: string) {
    if (login) return true;
  }

  function validatePassword(password: string) {
    if (password.length < 8 || password.length > 16) {
      return false;
    }
    const lettersNumsRegex = /(?=.*[0-9])(?=.*[a-zA-Z])/;
    if (!lettersNumsRegex.test(password)) {
      return false;
    }
    const specialCharsRegex = /[^0-9a-zA-Z]/;
    return !(!specialCharsRegex.test(password));
  }

  function validateForm() {
    if (validateServiceName(formData.serviceName)
      && validateLogin(formData.login)
      && validatePassword(formData.password)) {
      setIsFormValid(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
    validateForm();
  }

  return (
    <form action="submit">
      <label htmlFor="service-name">Nome do serviço</label>
      <input
        value={ formData.serviceName }
        name="serviceName"
        type="text"
        id="service-name"
        onChange={ handleChange }
      />
      <label htmlFor="login">Login</label>
      <input
        onChange={ handleChange }
        value={ formData.login }
        name="login"
        type="text"
        id="login"
      />
      <label htmlFor="password">Senha</label>
      <input
        onChange={ handleChange }
        value={ formData.password }
        name="password"
        type="password"
      />
      <label htmlFor="url">URL</label>
      <input onChange={ handleChange } value={ formData.url } name="url" type="text" />
      {isFormValid && <button name="register" type="submit">Cadastrar</button>}
      <button name="cancel" onClick={ handleClick }>Cancelar</button>
    </form>
  );
}
