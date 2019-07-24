import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useDrag } from "react-dnd";
import { FaRegStar, FaStar, FaMinus, FaAngleDown } from "react-icons/fa";
import cn from "classnames";

import styledConfig from "../../utils/styledConfing";
import { setRating, deleteBook } from "../../actions/booksActions";
import SquareButton from "../common/SquareButton";
import AddTagForm from "./AddTagForm";

const BookItem = ({ className, book, setRating, deleteBook, loading }) => {
  const [rating, setStateRating] = useState(book.rating);
  const [displayTagForm, setDisplayTagForm] = useState(false);
  const [blockTagForm, setBlockTagForm] = useState(false);
  const [{}, drag] = useDrag({
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
        <div className="tags-container">Tags container</div>
        <SquareButton
          onClick={() => {
            setBlockTagForm(!blockTagForm);
            setTimeout(() => setDisplayTagForm(!displayTagForm), 4);
          }}
          color="lightgreen"
          className={cn("btn-addtag", { open: displayTagForm })}
        >
          <FaAngleDown
            className={cn("pointer", { rotated: !displayTagForm })}
            style={{}}
          />
        </SquareButton>
        <div className={cn("tag-form-container", { open: displayTagForm })}>
          <AddTagForm
            closeForm={setDisplayTagForm}
            isOpen={displayTagForm}
            isBlock={blockTagForm}
          />
        </div>
      </div>

      <div
        className="rating-container"
        onMouseLeave={() => {
          if (!loading) {
            setStateRating(book.rating);
          }
        }}
      >
        {[1, 2, 3, 4, 5].map((item, index) =>
          item <= rating ? (
            <div className="star-container" key={index}>
              <FaStar
                onMouseOver={() => setStateRating(item)}
                onClick={() => {
                  setRating(book._id, item);
                  setStateRating(item);
                }}
              />
            </div>
          ) : (
            <div className="star-container" key={index}>
              <FaRegStar
                onMouseOver={() => setStateRating(item)}
                onClick={() => {
                  setRating(book._id, item);
                  setStateRating(item);
                }}
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
  transition: height 0.2s ease-in;

  .btn-addtag {
    transition: opacity 0.2s ease-in;
    opacity: 0;
    &.open {
      opacity: 1;
    }

    .pointer {
      transition: all 0.2s ease-in;
      transform: rotate(0deg);

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
  :hover {
    .btn-addtag {
      opacity: 1;
    }
  }

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
    cursor: pointer;
  }
`;

const mapStateToProps = state => {
  return { loading: state.books.loading };
};

export default connect(
  mapStateToProps,
  { setRating, deleteBook }
)(StyledBookItem);
