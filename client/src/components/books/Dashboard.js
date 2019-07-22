import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getBooks } from "../../actions/booksActions";
import Column from "./Column";
import BookItem from "./BookItem";
import ColumnHeader from "./ColumnHeader";

const Dashboard = ({ getBooks, className, books }) => {
  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  const futureRenderContent = [<ColumnHeader children="Future: " />];
  const currentRenderContent = [<ColumnHeader children="Current: " />];
  const pastRenderContent = [<ColumnHeader children="Past: " />];

  books.map(book => {
    if (book.status === "future") {
      futureRenderContent.push(<BookItem book={book} />);
    } else if (book.staus === "current") {
      currentRenderContent.push(<BookItem book={book} />);
    } else if (book.status === "past") {
      pastRenderContent.push(<BookItem book={book} />);
    }
  });

  return (
    <div className={className}>
      <Column children={futureRenderContent} id="future" />
      <Column children={currentRenderContent} id="current" />
      <Column children={pastRenderContent} id="past" />
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
