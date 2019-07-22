import styled from "styled-components";

const StyledButton = styled.button`
  color: rgb(77, 77, 77);
  background-color: white;
  border: 1px solid rgb(77, 77, 77);
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
