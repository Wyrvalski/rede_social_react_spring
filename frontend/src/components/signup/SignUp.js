import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Box, Form } from './style';

const SignUp = (props) => {  
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

  const onClick = (e) => {
    const user = {
      name: name,
      username: username,
      password: password
    };
    e.preventDefault();
    props.actions.postSignup(user);
  };

  return (
    <Box m={3}>
      <h1>Cadastro</h1>
      <Form>
        <input
          type='text'
          name='name'
          placeholder='Nome'
          value={name}
          onChange={(e) => onChangeFormData(e)}
        />

        <input
          type='text'
          placeholder='Usuario'
          name='username'
          value={username}
          onChange={(e) => onChangeFormData(e)}
        />
        <input
          type='password'
          placeholder='Senha'
          name='password'
          value={password}
          onChange={(e) => onChangeFormData(e)}
        />
        <input
          type='password'
          placeholder='Confirmar senha'
          name='confirmPassword'
          value={confirmPassword}
          onChange={(e) => onChangeFormData(e)}
        />
        <div>
          <small>Já tem conta cadastrada? <Link to="/#">Logar</Link> </small>
          <button onClick={(e) => onClick(e)}>Enviar</button>
        </div>
      </Form>
    </Box>
  );
};

SignUp.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      })
  }
};

export default SignUp;
