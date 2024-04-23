// Dependencies
import styled from "styled-components";

// Hooks
import { useLocation } from "wouter";
import { useModalContext } from "../hooks/useModal";

// Components/styling
import NavRow from "./utils/NavRow";
import Button from "./utils/Button";
import SubNavbar from "./utils/SubNavbar";

import { Plus, Table } from "react-feather";

import { NavRowWrapper } from "./utils/NavRow";

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
      <DataNavbarWrapper>
        <Button type="primary" onClick={() => addTable({ tables, setTables })}>
          <Plus size={15} /> New Table
        </Button>
        <NavRowsWrapper>
          <NavRowWrapper
            className={!currentTable ? "active-nav-row" : ""}
            onClick={() => {
              setLocation("/data");
            }}
          >
            <Table size={15} />
            Tables
          </NavRowWrapper>
          <Separator />
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
        </NavRowsWrapper>
      </DataNavbarWrapper>
    </SubNavbar>
  );
}

const DataNavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 20px;
  min-height: 100%;
`;

const NavRowsWrapper = styled.div`
  width: 100%;
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  border: 1px solid var(--pk);
`;
