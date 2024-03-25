import { useState } from "react";

import PageHeader from "../components/utils/PageHeader";
import Logs from "../components/Logs";
import Card from "../components/utils/Card";
import Chart from "../components/Chart";

const getRandomTimestamp = () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const randomTimestamp = new Date(
    startOfMonth.getTime() +
      Math.random() * (endOfMonth.getTime() - startOfMonth.getTime())
  );

  return randomTimestamp.toISOString();
};
const logs = [];

for (let i = 0; i < 1000; i++) {
  logs.push({
    id: Math.random().toString(36).substring(7),
    type: Math.random() > 0.3 ? "normal" : "error",
    status: Math.floor(Math.random() * 500) + 100,
    method: Math.random() > 0.5 ? "get" : "post",
    url:
      "/api/collections/" + Math.random().toString(36).substring(7) + "/rows",
    auth: "admin",
    timestamp: getRandomTimestamp(),
  });
}

export default function Observability() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterBySearchTerm = (log) => {
    return (
      log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toString().includes(searchTerm) ||
      log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.auth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const todaysLogs = logs.filter(
    (log) =>
      new Date(log.timestamp).getDate() === new Date().getDate() &&
      new Date(log.timestamp).getMonth() === new Date().getMonth() &&
      new Date(log.timestamp).getFullYear() === new Date().getFullYear()
  );

  const requestsPerDay = () => {
    const days = logs.reduce((result, log) => {
      const date = new Date(log.timestamp);
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

    return Math.round(averageRequestsPerDay, 0);
  };

  return (
    <div className="observability-page">
      <Logs
        logs={logs.filter(filterBySearchTerm)}
        setSearchTerm={setSearchTerm}
      />

      <div className="observability-page-content">
        <PageHeader>
          <h1>Dashboard</h1>
        </PageHeader>
        <div className="observability-page-content-data">
          <div className="cards">
            <Card header="Requests today">{todaysLogs.length}</Card>
            <Card header="Average Requests/day">{requestsPerDay()}</Card>
            <Card header="Errors">
              {logs.filter((log) => log.type === "error").length}
            </Card>
          </div>
          <div className="chart">
            <Chart data={logs.filter(filterBySearchTerm)}></Chart>
          </div>
        </div>
      </div>
    </div>
  );
}
