import { createPortal } from "react-dom";

import api from "../../api/api.js";

import { useNotificationContext } from "../../hooks/useNotifications.jsx";
import { useConfirmModalContext } from "../../hooks/useConfirmModal.jsx";

export default function ActionBox({
  table,
  selectedRows,
  setSelectedRows,
  setRows,
}) {
  const {
    notificationState: { showing },
  } = useNotificationContext();
  const {
    actionCreators: { open },
  } = useConfirmModalContext();

  const handleDelete = () => {
    const promises = selectedRows.map((selectedRow) => {
      return api.deleteOne(table.id, selectedRow);
    });

    Promise.all(promises).then(() => {
      setSelectedRows([]);
      setRows((prev) => prev.filter((r) => !selectedRows.includes(r.id)));
    });
  };

  const actionBox = selectedRows.length && (
    <div className={`action-box ${showing && "above-notification"}`}>
      <div className="left">
        <span>
          {selectedRows.length} Row{`${selectedRows.length > 1 ? "s" : ""}`}{" "}
          Selected
        </span>
        <span className="reset" onClick={() => setSelectedRows([])}>
          Reset
        </span>
      </div>
      <div
        onClick={() => {
          open(
            `Are you sure you want to delete the selected row${
              selectedRows.length > 1 ? "s" : ""
            }?`,
            handleDelete
          );
        }}
        className="row-delete right"
      >
        <i className="fa-regular fa-trash"></i>
      </div>
    </div>
  );

  return createPortal(actionBox, document.querySelector("#action-box"));
}
