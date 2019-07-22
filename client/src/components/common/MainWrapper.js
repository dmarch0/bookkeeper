import styled from "styled-components";

const MainWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  font-family: sans-serif;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: 1200) {
    max-width: 1140px;
  }

  @media (min-width: 992) {
    max-width: 960px;
  }

  @media (min-width: 768) {
    max-width: 720px;
  }

  @media (min-width: 576) {
    max-width: 540px;
  }
`;

export default MainWrapper;
