import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useDrag } from "react-dnd";

import styledConfig from "../../utils/styledConfing";

const BookItem = ({ className, book }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "book", data: book },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  });
  return (
    <div className={className} ref={drag}>
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

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(StyledBookItem);
