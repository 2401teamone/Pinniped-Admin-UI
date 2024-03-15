import { useState } from 'react';

import Panel from '../../utils/Panel.jsx';

import { dropTable } from '../../../api/schema.js';

import { useLocation } from 'wouter';

export default function EditTableSettings({ tableId, setTables, closeModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const [, setLocation] = useLocation();

  return (
    <div className="table-form-settings-container">
      <div
        className="table-form-settings-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-regular fa-ellipsis"></i>
      </div>
      {isOpen && (
        <Panel setIsOpen={setIsOpen} position="right">
          <div className="table-form-settings">
            <div
              className="drop-table"
              onClick={() => {
                dropTable(tableId).then(() => {
                  setTables((prev) => prev.filter((t) => t.id !== tableId));
                  setLocation('/data');
                  closeModal();
                });
              }}
            >
              <i className="fa-regular fa-trash"></i> <span>Drop</span>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
