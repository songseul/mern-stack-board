import styled from '@emotion/styled';
const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const UploadForm = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  & #title {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;
    &:active,
    :focus {
      outline: none;
    }
  }
  & textarea {
    border-radius: 10px;
    min-height: 350px;
    resize: none;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    :focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0 0 5px whitesmoke;
    }
  }
  label {
    font-weight: bold;
    margin-top: 10px;
  }
`;

const UploadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: #000;
    color: #fff;
    border: 1px solid #000;

    &:hover {
      border: 1px solid #000;
      background-color: #fff;
      color: #000;
    }
  }
  & .cancel {
    margin-right: 10px;
    background-color: #fff;
    color: black;
    &:hover {
      border: 1px solid #000;
      background-color: #000;
      color: #fff;
    }
  }
`;
export { UploadDiv, UploadForm, UploadButtonDiv };
