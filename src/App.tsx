import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Services from './components/Services';
import { FormData } from './types/FormData';
import HidePasswordsCheckbox from './components/HidePasswordsCheckbox';

function App() {
  const [registerBtnVisiblity, setRegisterBtnVisibility] = useState(true);
  const [formVisibility, setFormVisibility] = useState(false);
  const [services, setServices] = useState<FormData[]>([]);
  const [hidePasswords, setHidePasswords] = useState(false);

  function handleRegister() {
    setRegisterBtnVisibility(false);
    setFormVisibility(true);
  }

  function handleCancel() {
    setRegisterBtnVisibility(true);
    setFormVisibility(false);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.currentTarget;
    if (name === 'register') handleRegister();
    if (name === 'cancel') handleCancel();
  }

  function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.currentTarget;
    setServices((prevServices) => prevServices
      .filter((service) => service.serviceName !== name));
  }

  function handleHidePass() {
    setHidePasswords((prevState) => !prevState);
  }

  return (
    <>
      <h1>Gerenciador de senhas</h1>
      {registerBtnVisiblity
      && <button name="register" onClick={ handleClick }>Cadastrar nova senha</button>}
      {formVisibility
      && <Form
        handleClick={ handleClick }
        setFormVisibility={ setFormVisibility }
        setRegisterBtnVisibility={ setRegisterBtnVisibility }
        setServices={ setServices }
        setHidePasswords={ setHidePasswords }
      />}
      {services.length > 0 && <HidePasswordsCheckbox handleHidePass={ handleHidePass } />}
      <Services
        services={ services }
        handleRemove={ handleRemove }
        hidePasswords={ hidePasswords }
      />
    </>
  );
}

export default App;
