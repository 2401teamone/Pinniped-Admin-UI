import { createPortal } from 'react-dom';

export default function SideModal({ onClose, children }) {
  const sideModal = (
    <div className="side-modal-container">
      <div className="side-modal-background" onClick={onClose}></div>
      <div className="side-modal">
        <div className="close-side-modal" onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(sideModal, document.querySelector('#side-modal'));
}
