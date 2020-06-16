import styled from 'styled-components';

export const Box = styled.div`
  margin-top: auto;
  margin: 100px auto;
  max-width: 500px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  border-radius: 20px;
  h1 {
    color: #ffa500;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  input {
    width: 90%;
    max-width: 500px;
    margin: 5px;
    min-width: 260px;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  button {
    color: white;
    background: #ffa500;
    border-radius: 5px;
    width: 60px;
    margin: 4%;
  }

  small {
    color: #ffa500;
    padding: 15px;
  }

  button:hover {
    cursor: pointer;
  }
`;
