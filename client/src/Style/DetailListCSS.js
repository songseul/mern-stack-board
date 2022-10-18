import styled from '@emotion/styled';

const PostDiv = styled.div`
  margin: 0 auto !important;
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
`;
const PostBox = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto !important;
  min-height: 120px;
  background: #fff;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 20px;
  box-shadow: 0px 19px 28px rgba(0, 0, 0, 0.3), 0px 15px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 756px) {
    width: 90%;
  }

  .title {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;
const BtnDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  & .edit {
    margin: 5px;
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
  & .delete {
    margin: 5px;
    border-radius: 15px;
    padding: 5px 10px;
    background-color: red;
    color: #fff;
    border: 1px solid red;

    &:hover {
      border: 1px solid red;
      background-color: #fff;
      color: #000;
    }
  }
`;

const SpinnerDiv = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export { PostBox, BtnDiv, PostDiv, SpinnerDiv };
