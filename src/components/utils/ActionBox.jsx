import { createPortal } from 'react-dom';

import api from '../../api/api.js';

export default function ActionBox({
  table,
  selectedRow,
  setSelectedRow,
  setRows,
}) {
  const handleDelete = () => {
    api.deleteOne(table.id, selectedRow).then(() => {
      console.log('deleting', table.id, selectedRow);
      setSelectedRow(null);
      setRows((prev) => prev.filter((r) => r.id !== selectedRow));
    });
  };

  const actionBox = (
    <div
      className={`action-box ${
        selectedRow === null ? 'slide-out' : 'slide-in'
      }`}
    >
      {' '}
      {selectedRow && (
        <div>
          <div className="left">
            <span>Row Selected</span>
            <span className="reset" onClick={() => setSelectedRow(null)}>
              Reset
            </span>
          </div>
          <div onClick={handleDelete} className="row-delete right">
            <i className="fa-regular fa-trash"></i>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(actionBox, document.querySelector('#action-box'));
}
