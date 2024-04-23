import { useModalContext } from "../hooks/useModal";
import { useState } from "react";
import { format } from "date-fns";
import api from "../api/api.js";

import { AlertCircle, MinusCircle } from "react-feather";

const determineColor = (method) => {
  switch (method) {
    case "get":
      return "#447604";
    case "post":
      return "#658E9C";
    case "patch":
      return "#F4D35E";
    case "delete":
      return "#E65F5C";
    default:
      return "#2F2F2F";
  }
};

export default function Log({ log, viewingLog, setViewingLog, setLogs }) {
  const [hovering, setHovering] = useState(false);
  const {
    modalState,
    actionCreators: { viewLog },
  } = useModalContext();

  return (
    <div
      className={`log ${
        log.id === viewingLog && modalState.isOpen ? "viewing-log" : ""
      }`}
      onClick={() => {
        viewLog(log);
        setViewingLog(log.id);
      }}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <div className="top">
        <div>
          <span
            className="log-method"
            style={{ color: determineColor(log.method.toLowerCase()) }}
          >
            {log.method}
          </span>
          {": "}
          <span className="log-status">{log.statusCode}</span>
          {log.statusCode >= 400 ? (
            <span className="error">
              <AlertCircle size={12} />
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="log-timestamp">
          {format(log.timestamp, "M/d/yy hh:mm:ss")}
        </div>
      </div>
      <div className="bottom">
        <div className="log-url">{log.url}</div>
      </div>
      {hovering ? (
        <div
          className="delete-log"
          onClick={(e) => {
            e.stopPropagation();
            api
              .deleteLog(log.id)
              .then(() => {
                setLogs((prev) => prev.filter((l) => l.id !== log.id));
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          <MinusCircle size={12} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
