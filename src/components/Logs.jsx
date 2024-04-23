import { useState } from "react";
import styled from "styled-components";

import SubNavbar from "./utils/SubNavbar";
import Log from "./Log";

export default function Logs({ logs, setLogs, setSearchTerm }) {
  const [viewingLog, setViewingLog] = useState(null);
  const [input, setInput] = useState("");

  return (
    <SubNavbar>
      <Container className="logs">
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
      </Container>
    </SubNavbar>
  );
}

const Container = styled.div`
  grid-area: subnavbar;

  & .logs-header {
    text-align: center;
    padding: 10px 0;
    font-size: 1.5rem;
    margin: 10px 0;
  }

  & .search-logs {
    /* margin-bottom: 20px; */
    border-bottom: 1px solid var(--pk);
    position: relative;

    & input {
      width: 100%;
      font-size: 1.1rem;
      padding: 5px;

      &:hover {
        background-color: var(--secondary-background);
      }
    }

    & button {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: 0.9rem;
      padding: 5px;
      background-color: inherit;
      border-radius: var(--min-radius);

      &:hover {
        background-color: var(--hover);
      }
    }
  }

  & .logs-rows {
    max-height: 92vh;
    overflow-y: scroll;
  }
  & .log {
    position: relative;
    padding: 10px;
    border-bottom: 1px solid var(--light-gray);
    cursor: pointer;

    & .delete-log {
      position: absolute;
      right: 3px;
      bottom: 3px;
      color: var(--error-font);
      font-size: 1.3rem;
      cursor: pointer;
      z-index: 80;
    }

    &.viewing-log {
      background-color: var(--secondary-background);
    }

    &.error {
      background-color: var(--error-background);
    }

    & .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      & .error {
        color: var(--error-font);

        margin-left: 5px;
      }

      & .log-method {
        font-size: 1.1rem;
        color: var(--text-color);
        font-weight: 600;
      }
      & .log-timestamp {
        font-size: 0.9rem;
        color: var(--text-color);
      }
    }

    & .bottom {
      & .log-url {
        font-size: 0.9rem;
        color: var(--text-color);
      }
    }

    &:hover {
      background-color: var(--hover);
    }
  }
`;
