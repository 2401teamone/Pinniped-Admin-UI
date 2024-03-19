import Settings from '../../utils/Settings';

import api from '../../../api/api.js';

import { useNotificationContext } from '../../../hooks/useNotifications';

import { useLocation } from 'wouter';

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
              setLocation('/data');
              closeModal();
            })
            .catch((err) => {
              console.log(err);
              showError(err.response.data.message);
              // setIsOpen(false);
            });
        }}
      >
        <i className="fa-regular fa-trash"></i> <span>Drop</span>
      </div>
    </Settings>
  );
}
