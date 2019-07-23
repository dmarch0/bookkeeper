import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FaPlus, FaHamburger } from "react-icons/fa";

import { getBooks } from "../../actions/booksActions";
import Column from "./Column";
import BookItem from "./BookItem";
import ColumnHeader from "./ColumnHeader";
import SquareButton from "../common/SquareButton";
import AddBookForm from "./AddBookForm";
import StyledModal from "./AddBookModal";
import { setLanguage } from "../../actions/languageActions";

const Dashboard = ({ getBooks, className, books, language, setLanguage }) => {
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
    if (book.status === "future") {
      futureRenderContent.push(<BookItem book={book} key={index} />);
    } else if (book.status === "current") {
      currentRenderContent.push(<BookItem book={book} key={index} />);
    } else {
      pastRenderContent.push(<BookItem book={book} key={index} />);
    }
  });

  return (
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
  );
};

const StyledDashboard = styled(Dashboard)`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 4px;
`;

const mapStateToProps = state => {
  return { books: state.books.books, language: state.language };
};

export default connect(
  mapStateToProps,
  { getBooks, setLanguage }
)(StyledDashboard);
