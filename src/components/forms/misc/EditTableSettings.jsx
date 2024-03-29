import Settings from "../../utils/Settings";

import api from "../../../api/api.js";

import { useNotificationContext } from "../../../hooks/useNotifications";

import { useLocation } from "wouter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditTableSettings({ tableId, setTables, closeModal }) {
  const {
    actionCreators: { showError },
  } = useNotificationContext();

  const [, setLocation] = useLocation();

  return (
    <Settings>
      <div
        className="settings-item"
        onClick={() => {
          api
            .dropTable(tableId)
            .then(() => {
              setTables((prev) => prev.filter((t) => t.id !== tableId));
              setLocation("/_/data");
              closeModal();
            })
            .catch((err) => {
              showError(err.response.data.message);
            });
        }}
      >
        <FontAwesomeIcon icon="fa-regular fa-trash" /> <span>Drop</span>
      </div>
    </Settings>
  );
}
