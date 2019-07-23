import Modal from "react-modal";
import styled from "styled-components";
import React from "react";

import styledConfig from "../../utils/styledConfing";

const AddBookModal = ({ children, className, isOpen }) => {
  return (
    <Modal isOpen={isOpen} className={className} ariaHideApp={false}>
      {children}
    </Modal>
  );
};

const StyledModal = styled(AddBookModal)`
  background-color: white;
  width: 400px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  border: 1px solid ${styledConfig.mainColor};
  outline: none;
  border-radius: 10px;
`;

export default StyledModal;
