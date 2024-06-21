import { useState, useEffect } from "react";
import styled from "styled-components";

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
            // headers: JSON.parse(log.headers),
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
      <PageContainer className="observability-page">
        <Logs
          logs={logs.filter(filterBySearchTerm)}
          setLogs={setLogs}
          setSearchTerm={setSearchTerm}
        />

        <Container className="observability-page-content">
          <PageHeader>
            <h1>Dashboard</h1>
          </PageHeader>
          <Content className="observability-page-content-data">
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
          </Content>
        </Container>
      </PageContainer>
    )
  );
}

const PageContainer = styled.div`
  min-height: 100vh;

  display: grid;
  grid-template-columns: var(--subnavbar-width) minmax(0, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "subnavbar observability-page-content";

  overflow: scroll;
`;

const Container = styled.div`
  grid-area: observability-page-content;
  min-height: 100vh;

  h1 {
    font-size: 2rem;
    color: var(--text-color);
  }
`;

const Content = styled.div`
  padding: 40px;
  
  & .cards {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;

    & .card {
      width: 250px;
      height: 90px;
      border-radius: var(--min-radius);
      border: 1px solid var(--pk);
      box-shadow: var(--shadow-4);
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: white;

      & .card-header {
        font-size: 1.2rem;
        border-bottom: 1px solid var(--pk);
        padding-bottom: 2px;
      }

      & .data {
        color: var(--text-color);
        font-weight: 600;
        font-size: 1.8rem;
      }
    }
  }

  & .chart {
    display: flex;
    justify-content: start;
    border: 1px solid var(--pk);
    padding: 20px;
    border-radius: var(--min-radius);
    box-shadow: var(--shadow-4);
    background-color: white;
  }
}`;
