import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";

const InputField = ({
  name,
  label,
  type,
  className,
  error,
  info,
  placeholder
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <Field
        component="input"
        type={type ? type : "text"}
        name={name}
        id={name}
        placeholder={placeholder}
      />
      {error ? (
        <div className="error bottom">X {error}</div>
      ) : (
        <div className="info bottom">{info}</div>
      )}
    </div>
  );
};

const StyledInputField = styled(InputField)`
  width: 100%;
  color: rgb(77, 77, 77);

  label {
    font-size: 2rem;
    display: block;
    padding-bottom: 0.3rem;
    width: 100%;
    text-align: ${props => (props.centered ? "center" : "left")};
  }

  input {
    color: rgb(77, 77, 77);
    height: 2rem;
    padding: 0.5rem;
    font-size: 2rem;
    width: ${props => (props.small ? "40%" : "100%")};
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid grey;
    border-radius: 5px;
    margin-bottom: 0.3rem;

    ::placeholder {
      color: grey;
    }

    :focus {
      outline: none;
    }
  }

  .error {
    font-size: 1rem;
    color: red;
    font-weight: 300;
    text-align: ${props => (props.centered ? "center" : "left")};
  }
  .info {
    font-size: 1rem;
    color: rgb(77, 77, 77);
    font-weight: 300;
  }
  .bottom {
    margin-bottom: 1.5rem;
  }
`;

export default StyledInputField;
