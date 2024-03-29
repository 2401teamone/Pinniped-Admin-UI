import { useEffect } from "react";
import { createPortal } from "react-dom";

import { useNotificationContext } from "../../hooks/useNotifications.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Notification({ type, children }) {
  const {
    actionCreators: { closeNotification },
  } = useNotificationContext();

  useEffect(() => {
    if (type === "error" || type === "status") {
      const timeoutId = setTimeout(() => {
        closeNotification();
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [type, closeNotification]);

  const notification = (
    <div className={`notification ${type}`}>
      <div className="left">
        <div className="icon">
          {type === "error" ? (
            <FontAwesomeIcon icon="fa-regular fa-circle-exclamation" />
          ) : (
            <FontAwesomeIcon icon="fa-sharp fa-regular fa-check" />
          )}
        </div>
        <div className="message">{children}</div>
      </div>
      <div className="clear" onClick={closeNotification}>
        X
      </div>
    </div>
  );

  return createPortal(notification, document.querySelector("#notifications"));
}
