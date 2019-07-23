import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";
import { addBook } from "../../actions/booksActions";

const AddBookForm = ({ handleSubmit, setModal, addBook, language }) => {
  return (
    <form
      onSubmit={handleSubmit(formValues => {
        setModal(false);
        addBook(formValues);
      })}
    >
      <InputField
        label={language ? "Название" : "Title"}
        centered
        medium
        name="title"
      />
      <InputField
        label={language ? "Автор" : "Author"}
        centered
        medium
        name="author"
      />
      <SubmitButton centered>{language ? "Добавить" : "Add"}</SubmitButton>
    </form>
  );
};

const formConnected = reduxForm({ form: "add" })(AddBookForm);

const mapStateToProps = state => {
  return { language: state.language };
};

export default connect(
  mapStateToProps,
  { addBook }
)(formConnected);
