import styled from '@emotion/styled';

const LoginDiv = styled.div`
  width: 50%;
  max-width: 360px;
  margin: 0 auto;
  margin-top: 5rem;
  form {
    width: 70%;
    padding: 20px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
    }
    input {
      border-radius: 10px;
      border: 1px solid #e6e6e6;
      padding: 5px;
      margin-bottom: 10px;
      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 15px;
      padding: 5px 10px;
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
      margin-top: 10px;
      &:hover {
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      }
    }
    @media (max-width: 756px) {
      width: 100%;
    }
  }
`;

export default LoginDiv;
