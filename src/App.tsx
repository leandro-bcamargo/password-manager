import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Services from './components/Services';
import { FormData } from './types/FormData';

function App() {
  const [registerBtnVisiblity, setRegisterBtnVisibility] = useState(true);
  const [formVisibility, setFormVisibility] = useState(false);
  const [showSuccessRegisteredMsg, setShowSuccessRegisteredMsg] = useState(false);
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
    setShowSuccessRegisteredMsg(false);
  }

  function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.currentTarget;
    setServices((prevServices) => prevServices
      .filter((service) => service.serviceName !== name));
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
        setShowSuccessRegisteredMsg={ setShowSuccessRegisteredMsg }
        setRegisterBtnVisibility={ setRegisterBtnVisibility }
        setServices={ setServices }
        setHidePasswords={ setHidePasswords }
      />}
      {showSuccessRegisteredMsg && <p>Senha cadastrada com sucesso!</p>}
      <Services
        services={ services }
        handleRemove={ handleRemove }
        hidePasswords={ hidePasswords }
      />
    </>
  );
}

export default App;
