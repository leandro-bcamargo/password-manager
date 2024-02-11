import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  const [registerBtnVisiblity, setRegisterBtnVisibility] = useState(true)
  const [formVisibility, setFormVisibility] = useState(false)

  function handleRegister() {
    setRegisterBtnVisibility(false);
    setFormVisibility(true);
  }

  function handleCancel() {
    setRegisterBtnVisibility(true);
    setFormVisibility(false);
  }

  function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
    const {name} = e.currentTarget;
    if (name === 'register') handleRegister();
    if (name === 'cancel') handleCancel();
  }

  return (
    <>
    <h1>Gerenciador de senhas</h1>
    {registerBtnVisiblity && <button name="register" onClick={handleClick}>Cadastrar nova senha</button>}
    {formVisibility && <Form handleClick={handleClick}/>}
    </>
  );
}

export default App;
