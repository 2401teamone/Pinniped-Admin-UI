import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useNotificationContext } from '../../hooks/useNotifications.jsx';

export default function Notification({ type, children }) {
  const {
    actionCreators: { closeNotification },
  } = useNotificationContext();

  useEffect(() => {
    if (type === 'error' || type === 'status') {
      const timeoutId = setTimeout(() => {
        closeNotification();
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [type, closeNotification]);

  const notification = (
    <div className={`notification ${type}`}>
      <div className="icon">
        {type === 'error' ? (
          <i className="fa-regular fa-circle-exclamation"></i>
        ) : (
          <i className="fa-sharp fa-regular fa-check"></i>
        )}
      </div>
      <div className="message">{children}</div>
      <div className="clear" onClick={closeNotification}>
        X
      </div>
    </div>
  );

  return createPortal(notification, document.querySelector('#notifications'));
}
