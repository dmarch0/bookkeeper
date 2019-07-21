import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";

const Login = props => {
  return (
    <form onSubmit={props.handleSubmit(() => console.log("Submit"))}>
      <InputField name="email" label="Email" />
      <InputField name="password" label="Password" />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

const formWrapped = reduxForm({ form: "login" })(Login);

const mapStateToProps = state => {};

export default connect(
  mapStateToProps,
  {}
)(formWrapped);
