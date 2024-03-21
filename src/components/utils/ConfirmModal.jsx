import { createPortal } from "react-dom";

import Button from "./Button";

export default function SideModal({ onClose, children, onConfirm }) {
  const modal = (
    <div className="modal-container">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal">
        <div className="message">{children}</div>
        {onConfirm && typeof onConfirm === "function" ? (
          <div className="btns">
            <Button type="inherit" onClick={onClose}>
              No
            </Button>
            <Button type="danger" onClick={onConfirm}>
              Yes
            </Button>
          </div>
        ) : (
          <div className="btns">
            <Button type="inherit" onClick={onClose}>
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.querySelector("#modal"));
}
