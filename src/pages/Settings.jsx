import { useState } from "react";
import styled from "styled-components";

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
    default:
      component = null;
  }

  return (
    <PageContainer className="settings-page">
      <AdminButtons
        currentInterface={currentInterface}
        setCurrentInterface={setCurrentInterface}
      />

      <Container className="settings-page-content">
        <PageHeader>
          <Crumbs crumbs={["Settings", currentInterface]} />
        </PageHeader>

        <Content className="settings-page-content-data">{component}</Content>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height; 100vh;

  display: grid;
  grid-template-columns: var(--subnavbar-width) minmax(0, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "subnavbar settings-page-content"
`;

const Container = styled.div`
  grid-area: settings-page-content;
  min-height: 100vh;
  // overflow: scroll;
`;

const Content = styled.div`
  box-shadow: var(--shadow-4);
  border-radius: var(--min-radius);
  margin: 50px auto;
  width: 80%;
  min-width: 300px;
  padding: 30px;
  background-color: white;
`;
