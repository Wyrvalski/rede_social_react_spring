import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Form } from './style';
import CircularProgress from '@material-ui/core/CircularProgress';

const SignUp = (props) => {
  const [formData, setformData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    props.actions.postSignup(user).then((res) => {
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });
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
          <small>
            Já tem conta cadastrada? <Link to='/#'>Logar</Link>{' '}
          </small>

          <button disabled={loading} onClick={(e) => onClick(e)}>
            {' '}
            {loading && (
              <CircularProgress size={20} placeholder='loading...' />
            )}{' '}
            Enviar
          </button>
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
