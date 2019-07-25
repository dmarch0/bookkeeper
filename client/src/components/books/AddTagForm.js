import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { FaPlus, FaHamburger } from "react-icons/fa";

import styledConfig from "../../utils/styledConfing";
import SquareButton from "../common/SquareButton";
import { addTag } from "../../actions/booksActions";

const AddTagForm = ({ className, isOpen, handleSubmit, book_id, addTag }) => {
  return (
    <form
      className={className}
      onSubmit={handleSubmit(formValues => {
        console.log("submit");
        addTag(formValues, book_id);
      })}
    >
      <Field component="input" name="text" type="text" />
      <SquareButton color="lightgreen" inline>
        <FaPlus />
      </SquareButton>
    </form>
  );
};

const StyledTagForm = styled(AddTagForm)`
  display: ${props => (props.isBlock ? "block" : "none")};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  transition: all 0.2s ease-in;
  transform: ${props =>
    props.isOpen ? "translate(0, 0px)" : "translate(0, -20px)"};

  input {
    width: 50%;
    height: 30px;
    font-size: 1.5rem;
    border: 1px solid ${styledConfig.mainColor};
    border-radius: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
    position: relative;

    :focus {
      outline: none;
    }
  }
`;

const formConnected = reduxForm({ form: "tag" })(StyledTagForm);

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { addTag }
)(formConnected);
