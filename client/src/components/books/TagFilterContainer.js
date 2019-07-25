import styled from "styled-components";

import styledConfig from "../../utils/styledConfing";

const TagFilterContainer = styled.div`
  height: 30px;
  border-bottom: 1px dotted ${styledConfig.mainColor};
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  vertical-align: center;
  align-content: center;
  span {
    margin-right: 10px;
  }
  .btn-clear {
    border: 1px solid ${styledConfig.mainColor};
    background-color: white;
    color: ${styledConfig.mainColor};
    border-radius: 5px;
    font-size: 1rem;
    margin-left: 10px;

    :focus {
      outline: none;
    }
  }
`;

export default TagFilterContainer;
