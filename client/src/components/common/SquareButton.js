import styled from "styled-components";

const SquareButton = styled.div`
  float: ${props => props.float};
  background-color: ${props => props.color};
  width: ${props => (props.width ? props.width : "30px")};
  height: 30px;
  border-radius: 6px;
  margin: 4px 4px;
  display: ${props => (props.inline ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;

  svg {
    height: 80%;
    width: 80%;
    fill: white;
  }
`;

export default SquareButton;
