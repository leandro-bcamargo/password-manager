import React, { useCallback, useState } from 'react';
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

  const handleRegister = useCallback(() => {
    setRegisterBtnVisibility(false);
    setFormVisibility(true);
  }, []);

  const handleCancel = useCallback(() => {
    setRegisterBtnVisibility(true);
    setFormVisibility(false);
  }, []);

  const handleRemove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setServices((prevServices) => prevServices
      .filter((service) => service.serviceName !== name));
  }, []);

  const handleHidePass = useCallback(() => {
    setHidePasswords((prevState) => !prevState);
  }, []);

  return (
    <div className="app">
      <div className="title">
        <h1>Gerenciador de senhas</h1>
      </div>
      <div className="register-btn">
        {registerBtnVisiblity
        && (
          <button
            name="register"
            onClick={ handleRegister }
          >
            Cadastrar nova senha
          </button>)}
      </div>
      {formVisibility
        && <Form
          handleCancel={ handleCancel }
          handleRegister={ handleRegister }
          setFormVisibility={ setFormVisibility }
          setRegisterBtnVisibility={ setRegisterBtnVisibility }
          setServices={ setServices }
        />}
      <div className="hide-pass-checkbox">
        {services.length > 0
        && <HidePasswordsCheckbox handleHidePass={ handleHidePass } />}
      </div>
      <div className="services">
        <Services
          services={ services }
          handleRemove={ handleRemove }
          hidePasswords={ hidePasswords }
        />
      </div>
    </div>
  );
}

export default App;
