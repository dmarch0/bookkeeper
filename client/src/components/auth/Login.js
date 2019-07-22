import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";
import { loginUser } from "../../actions/authActions";

const Login = ({ formError, history, handleSubmit, loginUser }) => {
  return (
    <form onSubmit={handleSubmit(formValues => loginUser(formValues, history))}>
      <InputField
        name="email"
        label="Email"
        small
        centered
        error={formError.email}
      />
      <InputField
        name="password"
        label="Password"
        small
        centered
        error={formError.password}
      />
      <SubmitButton centered>Submit</SubmitButton>
    </form>
  );
};

const formWrapped = reduxForm({ form: "login" })(Login);

const mapStateToProps = state => {
  return {
    formError: state.error
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(formWrapped);
