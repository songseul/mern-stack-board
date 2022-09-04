import styled from '@emotion/styled';

const ListDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;

  @media (max-width: 756px) {
    width: 90%;
  }
  a {
    color: #000;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
`;
const ListItem = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  background: #fff;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 20px;
  box-shadow: 0px 19px 28px rgba(0, 0, 0, 0.3), 0px 15px 12px rgba(0, 0, 0, 0.1);
`;

export { ListDiv, ListItem };
