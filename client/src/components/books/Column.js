import styled from "styled-components";

import styledConfig from "../../utils/styledConfing";

const Column = styled.div`
  flex: 33%;
  max-width: 33%;
  border: 1px solid ${styledConfig.mainColor};
  border-radius: 10px;
  margin: 0 4px;
`;

export default Column;
