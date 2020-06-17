import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './SignUp';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SignUp', () => {
  describe('Layout', () => {
    it('Deve existir o componente', () => {
      const { container } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Cadastro');
    });
    it('input para enviar com placeholder "Nome"', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Nome');
      expect(displayInput).toBeInTheDocument();
    });
    it('input para enviar com placeholder "Usuario"', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Usuario');
      expect(displayInput).toBeInTheDocument();
    });
    it('input para enviar com placeholder "Senha"', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Senha');
      expect(displayInput).toBeInTheDocument();
    });
    it('input do tipo "Senha"', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Senha');
      expect(displayInput.type).toBe('password');
    });
    it('input para enviar com placeholder "Confirmar senha"', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Confirmar senha');
      expect(displayInput).toBeInTheDocument();
    });
    it('input do tipo "Senha"', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Confirmar senha');
      expect(displayInput.type).toBe('password');
    });
    it('Deve existir o botão de enviar', () => {
      const { container } = render(
        <Router>
          <SignUp />
        </Router>
      );
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
      const rendered = render(
        <Router>
          <SignUp {...props} />
        </Router>
      );

      const { container, queryByPlaceholderText } = rendered;

      name = queryByPlaceholderText('Nome');
      username = queryByPlaceholderText('Usuario');
      password = queryByPlaceholderText('Senha');
      passwordRepeat = queryByPlaceholderText('Confirmar senha');

      fireEvent.change(name, changeEvent('Nome'));
      fireEvent.change(username, changeEvent('Usuario'));
      fireEvent.change(password, changeEvent('senha'));
      fireEvent.change(passwordRepeat, changeEvent('senha'));

      button = container.querySelector('button');
      return rendered;
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res({});
          }, 300);
        });
      });
    };

    it('Deve enviar o input nome para detro do state', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Nome');

      fireEvent.change(displayInput, changeEvent('nome-no-input'));

      expect(displayInput).toHaveValue('nome-no-input');
    });
    it('Deve enviar o input Usuario para detro do state', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Usuario');

      fireEvent.change(displayInput, changeEvent('username-no-input'));

      expect(displayInput).toHaveValue('username-no-input');
    });

    it('Deve enviar o input Senha para detro do state', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
      const displayInput = queryByPlaceholderText('Senha');

      fireEvent.change(displayInput, changeEvent('senha-no-input'));

      expect(displayInput).toHaveValue('senha-no-input');
    });
    it('Deve enviar o input Confirmar senha para detro do state', () => {
      const { queryByPlaceholderText } = render(
        <Router>
          <SignUp />
        </Router>
      );
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

    it('Não deve ser possível enivar outro forumlário enquanto outro está sendo enviado', () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      };

      setupForSubmit({ actions });

      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('Deve mostrar spinner enqunto envia chamada a api', () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      };

      const { queryByPlaceholderText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByPlaceholderText('loading...');
      expect(spinner).toBeInTheDocument();
    });

    it('Deve esconder spinner depois que a chamada termina', async () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      };
      const { queryByPlaceholderText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForDomChange();

      const spinner = queryByPlaceholderText('loading...');
      expect(spinner).not.toBeInTheDocument();
    });

    it('Deve esconder spinner depois que a chamada termina', async () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      };
      const { queryByPlaceholderText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForDomChange();

      const spinner = queryByPlaceholderText('loading...');
      expect(spinner).not.toBeInTheDocument();
    });

    it('Deve esconder spinner depois que a chamada termina com erro', async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((res, rej) => {
            setTimeout(() => {
              rej({
                res: { data: {} }
              });
            }, 300);
          });
        })
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForDomChange();

      const spinner = queryByText('Loading...');
      expect(spinner).not.toBeInTheDocument();
    });
  });
});

console.error = () => {}
