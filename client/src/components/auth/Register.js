import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { registerUser } from "../../actions/authActions";
import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";

const Register = ({ handleSubmit, formError, registerUser, history }) => {
  return (
    <form
      onSubmit={handleSubmit(formValues => registerUser(formValues, history))}
    >
      <InputField
        name="email"
        label="Email"
        small
        centered
        error={formError.email}
      />
      <InputField
        name="namel"
        label="Name"
        small
        centered
        error={formError.name}
      />
      <InputField
        name="password"
        label="Password"
        small
        centered
        error={formError.password}
      />
      <InputField
        name="password2"
        label="Confirm password"
        small
        centered
        error={formError.password2}
      />
      <SubmitButton centered>Register</SubmitButton>
    </form>
  );
};

const formConntect = reduxForm({ form: "register" })(Register);

const mapStateToProps = state => {
  return { formError: state.formError };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(formConntect);
