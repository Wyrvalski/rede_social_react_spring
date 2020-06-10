import React from 'react';

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input type='text' placeholder='Nome' />
      </div>
      <div>
        <input type='text' placeholder='Usuario' />
      </div>
      <div>
        <input type='password' placeholder='Senha' />
      </div>
      <div>
        <input type='password' placeholder='Confirmar senha' />
      </div>
      <div>
        <button>Enviar</button>
      </div>
    </div>
  );
};

export default SignUp;
