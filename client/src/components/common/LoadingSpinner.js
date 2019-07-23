import React from "react";
import spinner from "./spinner.gif";
import styled from "styled-components";

const LoadingSpinner = ({ className }) => {
  return (
    <div className={className}>
      <img src={spinner} />
    </div>
  );
};

const StyledSpinner = styled(LoadingSpinner)`
  width: 100%;
  img {
    width: 100%;
  }
`;

export default StyledSpinner;
