import styled from "styled-components";

import styledConfig from "../../utils/styledConfing";

const ColumnHeader = styled.div`
  width: 100%;
  border-bottom: 1px dotted ${styledConfig.mainColor};
  margin: 10px 0px;
  text-indent: 5px;
  line-height: 2rem;
`;

export default ColumnHeader;
