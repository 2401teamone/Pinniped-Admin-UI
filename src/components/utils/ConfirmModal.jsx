import { createPortal } from "react-dom";

import Button from "./Button";

export default function SideModal({
  onClose,
  children,
  onConfirm,
  no = "no",
  yes = "yes",
}) {
  const modal = (
    <div className="modal-container">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal">
        <div className="message">{children}</div>
        {onConfirm && typeof onConfirm === "function" ? (
          <div className="btns">
            <Button type="inherit" onClick={onClose}>
              {no}
            </Button>
            <Button type="secondary" onClick={onConfirm}>
              {yes}
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
