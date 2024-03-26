import { useModalContext } from "../hooks/useModal";
import { format } from "date-fns";

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

export default function Log({ log, viewingLog, setViewingLog }) {
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
              <i className="fa-solid fa-circle-exclamation"></i>
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
    </div>
  );
}
