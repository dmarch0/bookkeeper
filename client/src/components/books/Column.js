import styled from "styled-components";
import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";

import styledConfig from "../../utils/styledConfing";
import { setBookStatus } from "../../actions/booksActions";

const Column = ({ className, children, id, setBookStatus }) => {
  const [{ isOver, item }, drop] = useDrop({
    accept: "book",
    drop: () => {
      setBookStatus(item.data._id, id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem()
    })
  });
  return (
    <div className={className} ref={drop}>
      {children}
    </div>
  );
};

const StyledColumn = styled(Column)`
  flex: 33%;
  max-width: 33%;
  border: 1px solid ${styledConfig.mainColor};
  border-radius: 10px;
  margin: 0 4px;
`;

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { setBookStatus }
)(StyledColumn);
