import { useState, useEffect } from "react";

import PageHeader from "../components/utils/PageHeader";
import Logs from "../components/Logs";
import Card from "../components/utils/Card";
import Chart from "../components/Chart";

import api from "../api/api.js";

export default function Observability() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getLogs() {
      const data = await api.getLogs();
      return data.logs;
    }
    getLogs().then((logs) => {
      setLogs(
        logs.map((log) => {
          return {
            ...log,
            timestamp: new Date(parseInt(log.time)),
            headers: JSON.parse(log.headers),
          };
        })
      );
    });
  }, []);

  const filterBySearchTerm = (log) => {
    return (
      log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.statusCode === searchTerm ||
      log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(log.timestamp).toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const todaysLogs = logs.filter(
    (log) =>
      log.timestamp.getDate() === new Date().getDate() &&
      log.timestamp.getMonth() === new Date().getMonth() &&
      log.timestamp.getFullYear() === new Date().getFullYear()
  );

  const requestsPerDay = () => {
    const days = logs.reduce((result, log) => {
      const date = log.timestamp;
      const day = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toISOString();

      if (!result[day]) {
        result[day] = 0;
      }

      result[day]++;

      return result;
    }, {});

    const uniqueDays = Object.keys(days).length;
    const totalRequests = logs.length;
    const averageRequestsPerDay = totalRequests / uniqueDays;

    const res = Math.round(averageRequestsPerDay, 0);

    return res;
  };

  return (
    logs && (
      <div className="observability-page">
        <Logs
          logs={logs.filter(filterBySearchTerm)}
          setLogs={setLogs}
          setSearchTerm={setSearchTerm}
        />

        <div className="observability-page-content">
          <PageHeader>
            <h1>Dashboard</h1>
          </PageHeader>
          <div className="observability-page-content-data">
            {!logs.length ? (
              ""
            ) : (
              <>
                <div className="cards">
                  <Card header="Requests today">{todaysLogs.length}</Card>
                  <Card header="Average Requests/day">{requestsPerDay()}</Card>
                  <Card header="Errors">
                    {logs.filter((log) => log.statusCode >= 400).length}
                  </Card>
                </div>
                <div className="chart">
                  <Chart data={logs.filter(filterBySearchTerm)}></Chart>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}
