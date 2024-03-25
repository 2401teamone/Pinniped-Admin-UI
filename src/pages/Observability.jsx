import PageHeader from "../components/utils/PageHeader";
import Logs from "../components/Logs";
import Card from "../components/utils/Card";

export default function Observability() {
  return (
    <div className="observability-page">
      <Logs />

      <div className="observability-page-content">
        <PageHeader>
          <h1>Dashboard</h1>
        </PageHeader>
        <div className="observability-page-content-data">
          <div className="cards">
            <Card header="Requests today">5</Card>
            <Card header="Requests/day">4</Card>
            <Card header="Errors">3</Card>
          </div>
          <div className="chart">Chart</div>
        </div>
      </div>
    </div>
  );
}
