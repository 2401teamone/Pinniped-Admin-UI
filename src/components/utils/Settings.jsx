import { useState } from "react";

import Panel from "./Panel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Settings({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="settings-container">
      <div className="settings-btn" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon="fa-regular fa-ellipsis" />
      </div>
      {isOpen && (
        <Panel setIsOpen={setIsOpen} position="right">
          <div className="settings">{children}</div>
        </Panel>
      )}
    </div>
  );
}
