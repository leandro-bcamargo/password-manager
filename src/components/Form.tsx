import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FormData } from '../types/FormData';

type FormProps = {
  handleCancel: () => void;
  handleRegister: () => void;
  setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterBtnVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setServices: React.Dispatch<React.SetStateAction<FormData[]>>;
};

export type FormErrors = {
  serviceName: string,
  login: string,
  password: string[],
  url: string,
};

export type SetFormErrors = React.Dispatch<React.SetStateAction<FormErrors>>;

export default function Form({ handleCancel, handleRegister,
  setFormVisibility,
  setRegisterBtnVisibility,
  setServices }: FormProps) {
  const [formData, setFormData] = useState({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [inputType, setInputType] = useState('password');

  const INVALID_PASSWORD_CLASS = 'invalid-password-check';
  const VALID_PASSWORD_CLASS = 'valid-password-check';

  const [passwordClasses, setPasswordClasses] = useState({
    minChars: INVALID_PASSWORD_CLASS,
    maxChars: VALID_PASSWORD_CLASS,
    lettersNums: INVALID_PASSWORD_CLASS,
    specialChars: INVALID_PASSWORD_CLASS,
  });

  function validateServiceName(serviceName: string) {
    if (serviceName) return true;
  }

  function validateLogin(login: string) {
    if (login) return true;
  }

  const validatePassword = useCallback((password: string) => {
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
  }, [passwordClasses]);

  const validateForm = useCallback(() => {
    const isServiceNameValid = validateServiceName(formData.serviceName);
    const isLoginValid = validateLogin(formData.login);
    const isPasswordValid = validatePassword(formData.password);
    if (isServiceNameValid && isLoginValid && isPasswordValid) {
      setIsFormValid(true);
    }
  }, [formData.login, formData.password, formData.serviceName, validatePassword]);

  useEffect(() => {
    validateForm();
  }, [formData.password, validateForm]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    validateForm();
    setFormData({ ...formData, [name]: value });
  }

  function showSuccessRegisteredMsg() {
    Swal.fire({
      title: 'Serviço cadastrado com sucesso',
      timer: 1500,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServices((prevServices) => [...prevServices, { ...formData }]);
    setFormVisibility(false);
    setRegisterBtnVisibility(true);
    showSuccessRegisteredMsg();
  }

  function handlePasswordFieldVisibility() {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
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
        type={ inputType }
        id="password"
      />
      <button
        type="button"
        data-testid="show-hide-form-password"
        onClick={ handlePasswordFieldVisibility }
      >
        Esconder/Mostrar senha
      </button>
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
        onClick={ handleRegister }
        disabled={ !isFormValid }
      >
        Cadastrar
      </button>
      <button name="cancel" onClick={ handleCancel }>Cancelar</button>
    </form>
  );
}
