import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";

import { deleteTag } from "../../actions/booksActions";
import { addToFilter, removeFromFilter } from "../../actions/filterActions";

const TagItem = ({
  tag,
  className,
  deleteTag,
  bookId,
  inFilter,
  addToFilter,
  removeFromFilter,
  text
}) => {
  return (
    <div className={className}>
      <button onClick={() => addToFilter(tag)} className="btn-add">
        +
      </button>
      {tag ? tag.text : text + " "}
      <button
        className="btn-remove"
        onClick={() => {
          if (!inFilter) {
            //if not in filter, remove tag action
            deleteTag(bookId, tag._id);
          } else {
            //if in filter, remove from filter
            removeFromFilter(tag);
          }
        }}
      >
        X
      </button>
    </div>
  );
};

const StyledTag = styled(TagItem)`
  border-radius: 5px;
  display: inline-block;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 2px;

  padding: 3px;
  background-color: ${props =>
    "rgb(" +
    props.tag.color.r +
    "," +
    props.tag.color.g +
    "," +
    props.tag.color.b +
    ")"};
  color: ${props => (props.tag.isBright ? "black" : "white")};

  .btn-add {
    display: ${props => (props.inFilter ? "none" : "inline")};
  }

  button {
    border: none;
    background-color: dimgray;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    :focus {
      outline: none;
    }
  }
  :hover {
    button {
      opacity: 1;
    }
  }
`;

export default connect(
  null,
  { deleteTag, addToFilter, removeFromFilter }
)(StyledTag);
