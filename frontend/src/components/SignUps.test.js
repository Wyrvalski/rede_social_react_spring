import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './SignUp';

describe('SignUp', () => {
  describe('Layout', () => {
    it('Deve existir o componente', () => {
        const { container } = render(<SignUp />);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up')
    });
  });
});
