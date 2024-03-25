import { useState } from "react";

import PageHeader from "../components/utils/PageHeader";
import AdminButtons from "../components/AdminButtons";
import Crumbs from "../components/utils/Crumbs";

export default function Settings() {
  const [currentInterface, setCurrentInterface] = useState("Backup");
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

        <div className="settings-page-content-data">Data</div>
      </div>
    </div>
  );
}
