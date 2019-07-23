import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";

import styledConfig from "../../utils/styledConfing";

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
  color: ${styledConfig.mainColor};

  label {
    font-family: sans-serif;
    font-size: 2rem;
    display: block;
    padding-bottom: 0.3rem;
    width: 100%;
    text-align: ${props => (props.centered ? "center" : "left")};
  }

  input {
    color: ${styledConfig.mainColor};
    height: 2rem;
    padding: 0.5rem;
    font-size: 2rem;
    width: ${props => (props.small ? "40%" : props.medium ? "60%" : "100%")};
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid ${styledConfig.mainColor};
    border-radius: 5px;
    margin-bottom: 0.3rem;

    ::placeholder {
      color: ${styledConfig.mainColor};
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
    color: ${styledConfig.mainColor};
    font-weight: 300;
  }
  .bottom {
    margin-bottom: 1.5rem;
  }
`;

export default StyledInputField;
