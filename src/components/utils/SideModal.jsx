import { createPortal } from "react-dom";
import styled from "styled-components";

import { X } from "react-feather";

export default function SideModal({ onClose, children }) {
  const sideModal = (
    <>
      <SideModalBackground onClick={onClose}></SideModalBackground>
      <SideModalWrapper>
        <div className="close-side-modal" onClick={onClose}>
          <X size={15} />
        </div>
        {children}
      </SideModalWrapper>
    </>
  );

  return createPortal(sideModal, document.querySelector("#side-modal"));
}

const SideModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--side-modal-background);
  z-index: 80;

  animation: showSideModalBackground 200ms ease;

  @keyframes showSideModalBackground {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SideModalWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: var(--side-modal-width);
  height: 100vh;

  box-shadow: var(--shadow-1);
  background-color: white;
  z-index: 90;

  animation: slideSideModalIn 150ms ease;

  & .close-side-modal {
    position: absolute;
    top: 20px;
    right: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 12px 15px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  @keyframes slideSideModalIn {
    from {
      right: -100%;
      width: calc(var(--side-modal-width) / 2);
    }
    to {
      right: 0;
      width: var(--side-modal-width);
    }
  }
`;
