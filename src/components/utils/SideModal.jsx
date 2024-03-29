import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideModal({ onClose, children }) {
  const sideModal = (
    <div className="side-modal-container">
      <div className="side-modal-background" onClick={onClose}></div>
      <div className="side-modal">
        <div className="close-side-modal" onClick={onClose}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(sideModal, document.querySelector("#side-modal"));
}
