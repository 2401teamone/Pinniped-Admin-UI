import { useState } from "react";

import SubNavbar from "./utils/SubNavbar";
import Log from "./Log";

export default function Logs() {
  const [viewingLog, setViewingLog] = useState(null);

  const logs = [
    {
      id: "123",
      type: "normal",
      status: 200,
      method: "get",
      url: "/api/collections/asdfadsf/rows",
      auth: "admin",
      timestamp: new Date().toISOString(),
    },
    {
      id: "456",
      type: "error",
      status: 404,
      method: "post",
      url: "/api/collections/weweds/rows",
      auth: "admin",
      timestamp: new Date(Date.now() - 1000).toISOString(), // Update timestamp to a different value
    },
    {
      id: "789",
      type: "normal",
      status: 200,
      method: "patch",
      url: "/api/collections/weweds/rows/asdf",
      auth: "admin",
      timestamp: new Date(Date.now() - 2000).toISOString(), // Update timestamp to a different value
    },
    {
      id: "101",
      type: "normal",
      status: 200,
      method: "get",
      url: "/api/collections/xyz/rows",
      auth: "admin",
      timestamp: new Date(Date.now() - 3000).toISOString(),
    },
    {
      id: "102",
      type: "error",
      status: 500,
      method: "post",
      url: "/api/collections/abc/rows",
      auth: "admin",
      timestamp: new Date(Date.now() - 4000).toISOString(),
    },
    {
      id: "103",
      type: "normal",
      status: 200,
      method: "patch",
      url: "/api/collections/abc/rows/xyz",
      auth: "admin",
      timestamp: new Date(Date.now() - 5000).toISOString(),
    },
  ];

  return (
    <SubNavbar>
      <div className="logs">
        <h2 className="logs-header">Logs</h2>
        <div className="logs-rows">
          {logs.length &&
            logs.map((log) => {
              return (
                <Log
                  key={log.id}
                  viewingLog={viewingLog}
                  setViewingLog={setViewingLog}
                  log={log}
                ></Log>
              );
            })}
        </div>
      </div>
    </SubNavbar>
  );
}
