import { useState, useEffect, useRef, memo } from "react";

import { useModalContext } from "../../hooks/useModal";
import api from "../../api/api.js";

import TH from "./TableHead";
import TableRow from "./TableRow";
import ActionBox from "../utils/ActionBox";
import Button from "../utils/Button";
import LoadingSpinner from "../utils/LoadingSpinner";

import { useNotificationContext } from "../../hooks/useNotifications";

export default function Table({ table, rows, setRows }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableIsScrolled, setTableIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);

  const {
    actionCreators: { showError },
  } = useNotificationContext();

  const tableRef = useRef();

  const {
    actionCreators: { addUser, addRecord },
  } = useModalContext();

  useEffect(() => {
    setSelectedRows([]);
  }, [table.id]);

  useEffect(() => {
    async function getRows() {
      const data = await api.getAll(table.id);
      return data;
    }
    const timeoutId = setTimeout(() => {
      setLoading(true);
    }, 50);

    getRows()
      .then((data) => {
        setRows(data.rows);
      })
      .catch((err) => {
        showError(err.message);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
        setHasQueried(true);
      });
  }, [setRows, showError, table.id]);

  useEffect(() => {
    const adjustTableHeight = () => {
      const availableHeight = window.innerHeight - 145 - 50;

      tableRef.current.style.maxHeight = availableHeight + "px";
    };

    adjustTableHeight();
    window.addEventListener("resize", adjustTableHeight);
    return () => {
      window.removeEventListener("resize", adjustTableHeight);
    };
  }, []);

  useEffect(() => {
    const table = document.querySelector(".table-container");
    const checkIfTableIsScrolled = () => {
      if (table.scrollLeft > 15) {
        console.log("is scrolled");
        setTableIsScrolled(true);
      } else {
        console.log("not scrolled");
        setTableIsScrolled(false);
      }
    };

    table.addEventListener("scroll", checkIfTableIsScrolled);

    return () => {
      table.removeEventListener("scroll", checkIfTableIsScrolled);
    };
  }, []);

  return (
    <div className="table-wrapper">
      <div className="table-container" ref={tableRef}>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th
                className={`select-row-header sticky-col ${
                  tableIsScrolled && "shadow"
                }`}
              ></th>
              <TH column={{ type: "pk", name: "id" }}></TH>
              {table &&
                table.columns
                  .filter((column) => column.type !== "password")
                  .map((column) => <TH key={column.name} column={column} />)}
              <TH column={{ type: "date", name: "created_at" }} />
              <TH column={{ type: "date", name: "updated_at" }} />
              <th className="right-arrow">...</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {loading && (
              <tr className="loading">
                <td colSpan={table.columns.length + 5}>
                  <LoadingSpinner />
                </td>
              </tr>
            )}
            {rows &&
              !loading &&
              rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    table={table}
                    row={row}
                    setRows={setRows}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    tableIsScrolled={tableIsScrolled}
                  />
                );
              })}
          </tbody>
        </table>
        {!rows.length && hasQueried && (
          <div className="no-rows-container">
            <div className="no-rows">
              <div className="no-rows-message">No rows for this table</div>
              <Button
                type="inherit"
                onClick={() => {
                  if (table.name === "users") {
                    addUser({ table, setRows });
                  } else addRecord({ table, setRows });
                }}
              >
                + Add Row
              </Button>
            </div>
          </div>
        )}
      </div>

      <ActionBox
        table={table}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setRows={setRows}
      />
    </div>
  );
}
