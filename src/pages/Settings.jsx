import { useState } from "react";

import PageHeader from "../components/utils/PageHeader";
import AdminButtons from "../components/AdminButtons";
import Crumbs from "../components/utils/Crumbs";
import Backup from "../components/Backup";

export default function Settings() {
  const [currentInterface, setCurrentInterface] = useState("Backup");

  let component = null;
  switch (currentInterface) {
    case "Backup":
      component = <Backup />;
      break;
    case "Logs":
      break;
    case "Observability":
      break;
    default:
  }

  return (
    <div className="settings-page">
      <AdminButtons
        currentInterface={currentInterface}
        setCurrentInterface={setCurrentInterface}
      />

      <div className="settings-page-content">
        <PageHeader>
          <Crumbs crumbs={["Settings", currentInterface]} />
        </PageHeader>

        <div className="settings-page-content-data">{component}</div>
      </div>
    </div>
  );
}
