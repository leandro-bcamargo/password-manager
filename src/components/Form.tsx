import React, { useEffect, useState } from 'react';
import { FormData } from '../types/FormData';

type FormProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccessRegisteredMsg: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterBtnVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setServices: React.Dispatch<React.SetStateAction<FormData[]>>;
  setHidePasswords: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormErrors = {
  serviceName: string,
  login: string,
  password: string[],
  url: string,
};

export type SetFormErrors = React.Dispatch<React.SetStateAction<FormErrors>>;

export default function Form({ handleClick,
  setFormVisibility, setShowSuccessRegisteredMsg,
  setRegisterBtnVisibility,
  setServices,
  setHidePasswords }: FormProps) {
  const [formData, setFormData] = useState({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const INVALID_PASSWORD_CLASS = 'invalid-password-check';
  const VALID_PASSWORD_CLASS = 'valid-password-check';

  const [passwordClasses, setPasswordClasses] = useState({
    minChars: INVALID_PASSWORD_CLASS,
    maxChars: VALID_PASSWORD_CLASS,
    lettersNums: INVALID_PASSWORD_CLASS,
    specialChars: INVALID_PASSWORD_CLASS,
  });

  useEffect(() => {
    validateForm();
  }, [formData.password]);

  function validateServiceName(serviceName: string) {
    if (serviceName) return true;
  }

  function validateLogin(login: string) {
    if (login) return true;
  }

  function validatePassword(password: string) {
    const lettersNumsRegex = /(?=.*[0-9])(?=.*[a-zA-Z])/;
    const specialCharsRegex = /[^0-9a-zA-Z]/;
    setPasswordClasses((prevClasses) => ({
      ...prevClasses,
      minChars: password.length < 8 ? INVALID_PASSWORD_CLASS : VALID_PASSWORD_CLASS,
      maxChars: password.length > 16 ? INVALID_PASSWORD_CLASS : VALID_PASSWORD_CLASS,
      lettersNums: lettersNumsRegex
        .test(password) ? VALID_PASSWORD_CLASS : INVALID_PASSWORD_CLASS,
      specialChars: specialCharsRegex
        .test(password) ? VALID_PASSWORD_CLASS : INVALID_PASSWORD_CLASS,
    }));
    return Object.values(passwordClasses)
      .every((className) => className === VALID_PASSWORD_CLASS);
  }

  function validateForm() {
    const isServiceNameValid = validateServiceName(formData.serviceName);
    const isLoginValid = validateLogin(formData.login);
    const isPasswordValid = validatePassword(formData.password);
    if (isServiceNameValid && isLoginValid && isPasswordValid) {
      setIsFormValid(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    validateForm();
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServices((prevServices) => [...prevServices, { ...formData }]);
    setShowSuccessRegisteredMsg(true);
    setFormVisibility(false);
    setRegisterBtnVisibility(true);
  }

  function handleHidePass() {
    setHidePasswords((prevState) => !prevState);
  }

  return (
    <form action="submit" onSubmit={ handleSubmit }>
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
        id="password"
      />
      <p className={ passwordClasses.minChars }>Possuir 8 ou mais caracteres</p>
      <p className={ passwordClasses.maxChars }>Possuir até 16 caracteres</p>
      <p className={ passwordClasses.lettersNums }>Possuir letras e números</p>
      <p className={ passwordClasses.specialChars }>Possuir algum caractere especial</p>
      <label htmlFor="url">URL</label>
      <input
        onChange={ handleChange }
        value={ formData.url }
        name="url"
        type="text"
        id="url"
      />
      <button
        name="register"
        type="submit"
        onClick={ handleClick }
        disabled={ !isFormValid }
      >
        Cadastrar
      </button>

      <button name="cancel" onClick={ handleClick }>Cancelar</button>
      <label htmlFor="hide-passwords">Esconder senhas</label>
      <input
        type="checkbox"
        id="hide-passwords"
        name="hide-passwords"
        onClick={ handleHidePass }
      />
    </form>
  );
}
