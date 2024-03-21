import { useState, useEffect, useCallback } from "react";

import api from "../api/api";

import { useModalContext } from "../hooks/useModal";
import { useNotificationContext } from "../hooks/useNotifications";

import { useLocation, useSearch } from "wouter";

import PageHeader from "../components/utils/PageHeader";
import Crumbs from "../components/utils/Crumbs";
import Button from "../components/utils/Button";
import ActionIcon from "../components/utils/ActionIcon";
import SearchBar from "../components/utils/SearchBar";
import DataNavbar from "../components/DataNavbar";
import Table from "../components/table/Table";
import Footer from "../components/utils/Footer";

export default function Data() {
  const [tables, setTables] = useState([]);
  const [rows, setRows] = useState([]);

  const [footerOverlapping, setFooterOverlapping] = useState(false);

  const {
    actionCreators: { addRecord, editTable },
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

  const getTable = (tableName) => {
    return tables.find((table) => table.name === tableName);
  };

  useEffect(() => {
    console.log("getting tables");
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

  useEffect(() => {
    if (tableName) {
      const footerIsOverlapping = () => {
        const table = document
          .querySelector(".table-wrapper")
          .getBoundingClientRect();
        const footer = document
          .querySelector(".footer")
          .getBoundingClientRect();

        const overlapping = !(footer.top > table.bottom);
        console.log(overlapping);

        if (overlapping) {
          setFooterOverlapping(true);
        } else setFooterOverlapping(false);
      };

      footerIsOverlapping();

      window.addEventListener("resize", footerIsOverlapping);
      return () => {
        window.removeEventListener("resize", footerIsOverlapping);
      };
    }
  }, [tableName]);

  return (
    <div className="data-page">
      <DataNavbar
        tables={tables}
        chooseTable={chooseTable}
        setTables={setTables}
        currentTable={tableName}
      />

      {tableName && (
        <div className="data-page-content">
          <PageHeader>
            <div className="left">
              <Crumbs crumbs={["Data", `${tableName}`]} />
              <div className="data-page-action-icons">
                <ActionIcon
                  onClick={() =>
                    editTable({
                      tables,
                      setTables,
                      currentSchema: getTable(tableName),
                    })
                  }
                >
                  <i className="fa-sharp fa-regular fa-gear"></i>
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
                  <i className="fa-light fa-arrows-rotate"></i>
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    window.navigator.clipboard.writeText(
                      getTable(tableName).id
                    );
                  }}
                >
                  <i className="fa-light fa-copy copy-btn" />
                </ActionIcon>
              </div>
            </div>
            <div className="right">
              <Button
                type="confirm"
                onClick={() =>
                  addRecord({ table: getTable(tableName), setRows })
                }
              >
                <i className="fa-regular fa-plus"></i> Add Row
              </Button>
            </div>
          </PageHeader>
          <SearchBar />
          <Table table={getTable(tableName)} rows={rows} setRows={setRows} />
          <Footer overlapping={footerOverlapping}>
            Total Found: {rows.length}
          </Footer>
        </div>
      )}
    </div>
  );
}
