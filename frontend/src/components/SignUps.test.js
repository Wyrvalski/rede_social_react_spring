import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './SignUp';

describe('SignUp', () => {
  describe('Layout', () => {
    it('Deve existir o componente', () => {
      const { container } = render(<SignUp />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Sign Up');
    });
    it('input para enviar com placeholder "Nome"', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Nome');
      expect(displayInput).toBeInTheDocument();
    });
    it('input para enviar com placeholder "Usuario"', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Usuario');
      expect(displayInput).toBeInTheDocument();
    });
    it('input para enviar com placeholder "Senha"', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Senha');
      expect(displayInput).toBeInTheDocument();
    });
    it('input do tipo "Senha"', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Senha');
      expect(displayInput.type).toBe('password');
    });
    it('input para enviar com placeholder "Confirmar senha"', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Confirmar senha');
      expect(displayInput).toBeInTheDocument();
    });
    it('input do tipo "Senha"', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Confirmar senha');
      expect(displayInput.type).toBe('password');
    });
    it('Deve existir o botão de enviar', () => {
      const { container } = render(<SignUp />);
      const header = container.querySelector('button');
      expect(header).toHaveTextContent('Enviar');
    });
  });
  describe('intereções', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content
        }
      };
    };

    let button, name, username, password, passwordRepeat;

    const setupForSubmit = (props) => {
      const { container, queryByPlaceholderText } = render(
        <SignUp {...props} />
      );

      name = queryByPlaceholderText('Nome');
      username = queryByPlaceholderText('Usuario');
      password = queryByPlaceholderText('Senha');
      passwordRepeat = queryByPlaceholderText('Confirmar senha');

      fireEvent.change(name, changeEvent('Nome'));
      fireEvent.change(username, changeEvent('Usuario'));
      fireEvent.change(password, changeEvent('senha'));
      fireEvent.change(passwordRepeat, changeEvent('senha'));

      button = container.querySelector('button');
    };

    it('Deve enviar o input nome para detro do state', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Nome');

      fireEvent.change(displayInput, changeEvent('nome-no-input'));

      expect(displayInput).toHaveValue('nome-no-input');
    });
    it('Deve enviar o input Usuario para detro do state', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Usuario');

      fireEvent.change(displayInput, changeEvent('username-no-input'));

      expect(displayInput).toHaveValue('username-no-input');
    });

    it('Deve enviar o input Senha para detro do state', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Senha');

      fireEvent.change(displayInput, changeEvent('senha-no-input'));

      expect(displayInput).toHaveValue('senha-no-input');
    });
    it('Deve enviar o input Confirmar senha para detro do state', () => {
      const { queryByPlaceholderText } = render(<SignUp />);
      const displayInput = queryByPlaceholderText('Confirmar senha');

      fireEvent.change(displayInput, changeEvent('confirmar-senha-no-input'));

      expect(displayInput).toHaveValue('confirmar-senha-no-input');
    });
    it('Deve chamar funçÃo post se estiver valido os dados do formulário', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      };

      setupForSubmit({ actions });

      fireEvent.click(button);
      const user = {
        name: 'Nome',
        username: 'Usuario',
        password: 'senha'
      };
      expect(actions.postSignup).toHaveBeenCalledWith(user);
    });

    it('Deve chamar um erro de excessão quando não validar', () => {
      setupForSubmit();

      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
});
