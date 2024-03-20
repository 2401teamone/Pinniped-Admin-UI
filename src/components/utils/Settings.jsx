import { useState } from 'react';

import Panel from './Panel';

export default function Settings({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="settings-container">
      <div className="settings-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-regular fa-ellipsis"></i>
      </div>
      {isOpen && (
        <Panel setIsOpen={setIsOpen} position="right">
          <div className="settings">{children}</div>
        </Panel>
      )}
    </div>
  );
}
