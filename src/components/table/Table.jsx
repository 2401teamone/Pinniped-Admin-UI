import { useState, useEffect, useRef } from "react";

import api from "../../api/api.js";

import TH from "./TableHead";
import TableRow from "./TableRow";
import ActionBox from "../utils/ActionBox";

// add search

export default function Table({ table, rows, setRows }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableIsScrolled, setTableIsScrolled] = useState(false);

  const tableRef = useRef();

  useEffect(() => {
    async function getRows() {
      const data = await api.getAll(table.id);
      console.log(data.rows);
      setRows(data.rows);
    }
    if (table) {
      console.log("fetched rows");
      getRows();
    }
  }, [table, setRows]);

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
            <tr>
              <th
                className={`select-row-header sticky-col ${
                  tableIsScrolled && "shadow"
                }`}
              ></th>
              <TH column={{ type: "pk", name: "id" }}></TH>
              {table &&
                table.columns.map((column) => (
                  <TH key={column.name} column={column} />
                ))}
              <TH column={{ type: "date", name: "created_at" }} />
              <TH column={{ type: "date", name: "updated_at" }} />
              <th className="right-arrow">...</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {rows &&
              rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    table={table}
                    row={row}
                    setRows={setRows}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    tableIsScrolled={tableIsScrolled}
                  />
                );
              })}
          </tbody>
        </table>
      </div>

      <ActionBox
        table={table}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setRows={setRows}
      />
    </div>
  );
}
