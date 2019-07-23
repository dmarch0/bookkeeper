import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useDrag } from "react-dnd";
import { FaRegStar, FaStar, FaMinus } from "react-icons/fa";

import styledConfig from "../../utils/styledConfing";
import { setRating, deleteBook } from "../../actions/booksActions";
import SquareButton from "../common/SquareButton";

const BookItem = ({ className, book, setRating, deleteBook }) => {
  const [rating, setStateRating] = useState(book.rating);
  const [{ isDragging }, drag] = useDrag({
    item: { type: "book", data: book },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  return (
    <div className={className} ref={drag}>
      <SquareButton
        color="salmon"
        float="right"
        onClick={() => deleteBook(book._id)}
      >
        <FaMinus />
      </SquareButton>
      <div className="info-container">
        <p>
          <strong>{book.title}</strong>
        </p>
        <p>{book.author}</p>
      </div>

      <div
        className="rating-container"
        onMouseLeave={() => setStateRating(book.rating)}
      >
        {[1, 2, 3, 4, 5].map((item, index) =>
          item <= rating ? (
            <div className="star-container">
              <FaStar
                onMouseOver={() => setStateRating(item)}
                onClick={() => {
                  setRating(book._id, item);
                  setStateRating(item);
                }}
                key={index}
              />
            </div>
          ) : (
            <div className="star-container">
              <FaRegStar
                onMouseOver={() => setStateRating(item)}
                onClick={() => {
                  setRating(book._id, item);
                  setStateRating(item);
                }}
                key={index}
              />
            </div>
          )
        )}
        {" " + rating + "/5"}
      </div>
    </div>
  );
};

const StyledBookItem = styled(BookItem)`
  border: 1px solid ${styledConfig.mainColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0 4px;
  margin: 4px;
  opacity: ${props => (props.book.ghosted ? "0.5" : "1")};

  .info-container {
    border-bottom: ${props =>
      props.book.status === "past"
        ? "1px dotted " + styledConfig.mainColor
        : "none"};
  }

  .rating-container {
    display: ${props => (props.book.status === "past" ? "block" : "none")};
    margin: 4px 4px;
  }
  .star-container {
    display: inline;
    margin: 2px 2px;
  }
`;

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { setRating, deleteBook }
)(StyledBookItem);
