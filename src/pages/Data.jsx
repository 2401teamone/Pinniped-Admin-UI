// Dependencies
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useSearch } from "wouter";

// API
import api from "../api/api";

// Hooks
import { useModalContext } from "../hooks/useModal";
import { useNotificationContext } from "../hooks/useNotifications";
import useFooterOverlapping from "../hooks/ui/useFooterOverlapping";

// Utils
import TableClass from "../utils/table.js";

// Components/styling
import Crumbs from "../components/utils/Crumbs";
import Button from "../components/utils/Button";
import ActionIcon from "../components/utils/ActionIcon";
import SearchBar from "../components/utils/SearchBar";
import DataNavbar from "../components/DataNavbar";
import Table from "../components/table/Table";
import TableDashboard from "../components/TableDashboard";
import Footer from "../components/utils/Footer";

import { Plus, Settings, RefreshCw, Copy } from "react-feather";

export default function Data() {
  const [tables, setTables] = useState([]);
  const [rows, setRows] = useState([]);

  const {
    actionCreators: { addUser, addRecord, editTable },
  } = useModalContext();

  const {
    actionCreators: { showError },
  } = useNotificationContext();

  const [, setLocation] = useLocation();

  const getTableFromQueryString = useCallback((queryString) => {
    const params = new URLSearchParams(queryString);
    return params.get("table");
  }, []);

  const queryString = useSearch();
  const tableName = getTableFromQueryString(queryString);

  const chooseTable = (tableName) => {
    setLocation(`/data?table=${tableName}`);
  };

  const getTable = useCallback(
    (tableName) => {
      let foundTable = tables.find((table) => table.name === tableName);
      if (foundTable) {
        return new TableClass(foundTable);
      }
    },
    [tables]
  );

  const footerOverlapping = useFooterOverlapping(getTable(tableName));

  useEffect(() => {
    async function getTables() {
      const data = await api.getTables();
      return data.tables;
    }
    getTables()
      .then((data) => {
        setTables(data);
      })
      .catch(() => {
        showError("Error fetching tables");
      });
  }, [showError]);

  return (
    <>
      <DataPage className="data-page">
        <DataNavbar
          tables={tables}
          chooseTable={chooseTable}
          setTables={setTables}
          currentTable={tableName}
        />
        {tableName ? (
          <DataPageContent className="data-page-content">
            <PageHeaderWrapper>
              <Crumbs crumbs={["Data", `${tableName}`]} />
              <ActionIconsWrapper>
                <ActionIcon
                  onClick={() =>
                    editTable({
                      tables,
                      setTables,
                      currentSchema: getTable(tableName),
                    })
                  }
                >
                  <Settings size={15} />
                </ActionIcon>
                <ActionIcon
                  onClick={async () => {
                    await api
                      .getAll(getTable(tableName).id)
                      .then((data) => {
                        setRows(data.rows);
                      })
                      .catch(() => {
                        showError(`Error fetching rows for ${tableName}`);
                      });
                  }}
                >
                  <RefreshCw size={15} />
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    window.navigator.clipboard.writeText(
                      getTable(tableName).id
                    );
                  }}
                >
                  <Copy size={15} />
                </ActionIcon>
              </ActionIconsWrapper>

              <Button
                type="confirm"
                onClick={() => {
                  let type = getTable(tableName).type;
                  if (type === "auth") {
                    addUser({ table: getTable(tableName), setRows });
                  } else {
                    addRecord({ table: getTable(tableName), setRows });
                  }
                }}
              >
                <Plus size={15} /> Add Row
              </Button>
            </PageHeaderWrapper>
            {/* <SearchBar /> */}
            {getTable(tableName) ? (
              <Table
                table={getTable(tableName)}
                rows={rows}
                setRows={setRows}
              />
            ) : (
              ""
            )}
            <Footer overlapping={footerOverlapping}>
              Total Found: {rows.length}
            </Footer>
          </DataPageContent>
        ) : (
          <DataPageContent>
            <TableDashboard tables={tables} chooseTable={chooseTable} />
          </DataPageContent>
        )}
      </DataPage>
    </>
  );
}

const DataPage = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: var(--subnavbar-width) minmax(0, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "subnavbar data-page-content";
`;

const DataPageContent = styled.div`
  grid-area: data-page-content;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`;

const PageHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  padding: 20px 40px;

  & button {
    margin-left: auto;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: start;

    & button {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

const ActionIconsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
