import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { getBooks } from "../../actions/booksActions";
import Column from "./Column";
import BookItem from "./BookItem";
import ColumnHeader from "./ColumnHeader";

const Dashboard = ({ getBooks, className, books }) => {
  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  const futureRenderContent = [
    <ColumnHeader children="Future: " key="header" />
  ];
  const currentRenderContent = [
    <ColumnHeader children="Current: " key="header" />
  ];
  const pastRenderContent = [<ColumnHeader children="Past: " key="header" />];

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
      <DndProvider backend={HTML5Backend}>
        <Column children={futureRenderContent} id="future" />
        <Column children={currentRenderContent} id="current" />
        <Column children={pastRenderContent} id="past" />
      </DndProvider>
    </div>
  );
};

const StyledDashboard = styled(Dashboard)`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 4px;
`;

const mapStateToProps = state => {
  return { books: state.books.books };
};

export default connect(
  mapStateToProps,
  { getBooks }
)(StyledDashboard);
