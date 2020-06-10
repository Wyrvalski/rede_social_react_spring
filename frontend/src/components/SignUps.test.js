import React from 'react';
import { render } from '@testing-library/react';
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
});
