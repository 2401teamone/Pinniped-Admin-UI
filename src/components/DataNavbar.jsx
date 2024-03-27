import NavRow from "./utils/NavRow";
import Button from "./utils/Button";
import SubNavbar from "./utils/SubNavbar";

import { useModalContext } from "../hooks/useModal";
import { useLocation } from "wouter";

export default function DataNavbar({
  tables,
  chooseTable,
  setTables,
  currentTable,
}) {
  const {
    actionCreators: { addTable },
  } = useModalContext();

  const [, setLocation] = useLocation();

  return (
    <SubNavbar>
      <div className="data-page-navbar">
        <Button type="primary" onClick={() => addTable({ tables, setTables })}>
          + New Table
        </Button>
        <div className="nav-rows">
          <div
            className={`home nav-row ${!currentTable ? "active-nav-row" : ""}`}
            onClick={() => {
              setLocation("/data");
            }}
          >
            <i className="fa-light fa-table"></i>
            Tables Dashboard
          </div>
          <div className="separator"></div>
          {tables.length &&
            tables
              .filter((table) => table.name !== "admins")
              .map((table) => {
                return (
                  <NavRow
                    key={table.name}
                    table={table}
                    active={table.name === currentTable}
                    onClick={() => chooseTable(table.name)}
                  >
                    {table.name}
                  </NavRow>
                );
              })}
        </div>
      </div>
    </SubNavbar>
  );
}
