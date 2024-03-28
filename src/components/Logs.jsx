import { useState } from "react";

import SubNavbar from "./utils/SubNavbar";
import Log from "./Log";

export default function Logs({ logs, setLogs, setSearchTerm }) {
  const [viewingLog, setViewingLog] = useState(null);
  const [input, setInput] = useState("");

  return (
    <SubNavbar>
      <div className="logs">
        <h2 className="logs-header">Logs</h2>
        <div className="search-logs">
          <input
            type="text"
            placeholder="Search logs"
            className="search-logs-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                setSearchTerm(input);
              } else if (e.key === "Escape") {
                setInput("");
                setSearchTerm("");
              }
            }}
            onBlur={() => setSearchTerm(input)}
          ></input>
          <div className="actions">
            {input.length ? (
              <button
                className="clear"
                onClick={() => {
                  setInput("");
                  setSearchTerm("");
                }}
              >
                Clear
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="logs-rows">
          {logs.length &&
            logs
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((log) => {
                return (
                  <Log
                    key={log.id}
                    viewingLog={viewingLog}
                    setViewingLog={setViewingLog}
                    log={log}
                    setLogs={setLogs}
                  ></Log>
                );
              })}
        </div>
      </div>
    </SubNavbar>
  );
}
