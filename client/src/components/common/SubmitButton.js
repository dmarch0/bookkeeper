import styled from "styled-components";

import styledConfig from "../../utils/styledConfing";

const StyledButton = styled.button`
  color: ${styledConfig.mainColor};
  background-color: white;
  border: 1px solid ${styledConfig.mainColor};
  border-radius: 5px;
  font-size: 2rem;
  padding: 0.5rem;
  margin-left: ${props => (props.centered ? "auto" : "0px")};
  margin-right: ${props => (props.centered ? "auto" : "0px")};
  width: 150px;
  display: block;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

export default StyledButton;
