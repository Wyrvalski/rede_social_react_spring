import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
  describe('Cadastro', () => {
      it('calls /api/user', () => {
          const testSignup = jest.fn();
          axios.post = testSignup;
          apiCalls.signup();

          const path = testSignup.mock.calls[0][0];
          expect(path).toBe('/api/user');
      })
  });
});
