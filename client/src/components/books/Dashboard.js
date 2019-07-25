import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FaPlus, FaHamburger } from "react-icons/fa";

import { getBooks } from "../../actions/booksActions";
import { clearFilter } from "../../actions/filterActions";
import Column from "./Column";
import BookItem from "./BookItem";
import ColumnHeader from "./ColumnHeader";
import SquareButton from "../common/SquareButton";
import AddBookForm from "./AddBookForm";
import StyledModal from "./AddBookModal";
import { setLanguage } from "../../actions/languageActions";
import TagItem from "./TagItem";
import TagFilterContainer from "./TagFilterContainer";

const Dashboard = ({
  getBooks,
  className,
  books,
  language,
  setLanguage,
  loading,
  filter,
  clearFilter
}) => {
  const [modalIsOpen, setModal] = useState(false);
  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  const futureRenderContent = [
    <ColumnHeader
      children={language ? "Буду читать: " : "Future: "}
      key="header"
    />
  ];
  const currentRenderContent = [
    <ColumnHeader children={language ? "Читаю: " : "Current: "} key="header" />
  ];
  const pastRenderContent = [
    <ColumnHeader children={language ? "Прочитал: " : "Past: "} key="header" />
  ];

  books.map((book, index) => {
    //Check if books has tags that are in filter
    let render = true;
    for (let tag of filter) {
      if (book.tags.filter(bookTag => bookTag.text === tag.text).length === 0) {
        render = false;
      }
    }

    if (!render) {
      return;
    }

    if (book.status === "future") {
      futureRenderContent.push(<BookItem book={book} key={index} />);
    } else if (book.status === "current") {
      currentRenderContent.push(<BookItem book={book} key={index} />);
    } else {
      pastRenderContent.push(<BookItem book={book} key={index} />);
    }
  });

  return (
    <div>
      <TagFilterContainer length={filter.length}>
        <p>Tag filter: </p>
        {filter.map((item, index) => (
          <TagItem tag={item} inFilter key={index} />
        ))}{" "}
        <button className="btn-clear" onClick={clearFilter}>
          clear filter
        </button>
      </TagFilterContainer>
      <div className={className}>
        <SquareButton
          color="lightgreen"
          onClick={() => setModal(true)}
          float="left"
        >
          <FaPlus />
        </SquareButton>
        <SquareButton
          color="lightgrey"
          float="left"
          onClick={() => setLanguage()}
        >
          {language ? "EN" : "RU"}
        </SquareButton>
        <DndProvider backend={HTML5Backend}>
          <Column children={futureRenderContent} id="future" />
          <Column children={currentRenderContent} id="current" />
          <Column children={pastRenderContent} id="past" />
        </DndProvider>
        <StyledModal isOpen={modalIsOpen}>
          <SquareButton
            float="right"
            color="dimgrey"
            onClick={() => setModal(false)}
          >
            <FaHamburger />
          </SquareButton>
          <AddBookForm setModal={setModal} />
        </StyledModal>
      </div>
    </div>
  );
};

const StyledDashboard = styled(Dashboard)`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 4px;
`;

const mapStateToProps = state => {
  return {
    books: state.books.books,
    language: state.language,
    loading: state.books.loading,
    filter: state.filter
  };
};

export default connect(
  mapStateToProps,
  { getBooks, setLanguage, clearFilter }
)(StyledDashboard);
