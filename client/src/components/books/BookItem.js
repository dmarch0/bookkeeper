import React from "react";
import styled from "styled-components";

import styledConfig from "../../utils/styledConfing";

const BookItem = ({ className, book }) => {
  return (
    <div className={className}>
      <p>
        <strong>{book.title}</strong>
      </p>
      <p>{book.author}</p>
    </div>
  );
};

const StyledBookItem = styled(BookItem)`
  border: 1px solid ${styledConfig.mainColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0 4px;
  margin: 4px;
`;

export default StyledBookItem;
