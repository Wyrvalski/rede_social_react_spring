import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setformData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { name, username, password, confirmPassword } = formData;

  const onChangeFormData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          type='text'
          name='name'
          placeholder='Nome'
          value={name}
          onChange={(e) => onChangeFormData(e)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Usuario'
          name='username'
          value={username}
          onChange={(e) => onChangeFormData(e)}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Senha'
          name='password'
          value={password}
          onChange={(e) => onChangeFormData(e)}
        />
      </div>
      <div>
        <input type='password' placeholder='Confirmar senha' name='confirmPassword' value={confirmPassword}
          onChange={(e) => onChangeFormData(e)}/>
      </div>
      <div>
        <button>Enviar</button>
      </div>
    </div>
  );
};

export default SignUp;
