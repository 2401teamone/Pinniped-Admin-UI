// Dependencies
import { useRef, memo } from "react";
import styled from "styled-components";

// Hooks
import { useModalContext } from "../../hooks/useModal";
import useFetchRows from "../../hooks/useFetchRows";
import useCheckScroll from "../../hooks/ui/useCheckScroll";
import useAdjustTable from "../../hooks/ui/useAdjustTable";
import useSelectRows from "../../hooks/useSelectRows";

// Components/styling
import TH from "./TableHead";
import TableRow from "./TableRow";
import ActionBox from "../utils/ActionBox";
import Button from "../utils/Button";
import LoadingSpinner from "../utils/LoadingSpinner";

export default memo(function Table({ table, rows, setRows }) {
  const tableRef = useRef();

  const {
    actionCreators: { addUser, addRecord },
  } = useModalContext();

  const { loading, hasQueried } = useFetchRows(table, setRows);
  const { tableIsScrolled } = useCheckScroll();
  const { selectedRows, setSelectedRows } = useSelectRows(table);
  useAdjustTable(tableRef);

  return (
    <TableWrapper className="table-wrapper">
      <TableContainer className="table-container" ref={tableRef}>
        <HTMLTable className="table">
          <Thead className="thead">
            <tr className="tr">
              <th
                className={`select-row-header sticky-col ${
                  tableIsScrolled && "shadow"
                }`}
              ></th>
              <TH column={{ type: "pk", name: "id" }}></TH>
              {table.type === "auth" ? (
                <TH column={{ type: "username", name: "username" }}></TH>
              ) : (
                ""
              )}
              {table &&
                table.columns
                  .filter((column) => column.show)
                  .map((column) => <TH key={column.name} column={column} />)}
              <TH column={{ type: "date", name: "created_at" }} />
              <TH column={{ type: "date", name: "updated_at" }} />
              <th className="right-arrow">...</th>
            </tr>
          </Thead>
          <Tbody className="tbody">
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
          </Tbody>
        </HTMLTable>
        {!rows.length && hasQueried && (
          <NoRows>
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
          </NoRows>
        )}
      </TableContainer>

      <ActionBox
        table={table}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setRows={setRows}
      />
    </TableWrapper>
  );
});

const TableWrapper = styled.div`
  padding: 2px 0;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  padding-bottom: 5px;
`;

const HTMLTable = styled.table`
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;

  & th:last-child,
  th:first-child,
  td:first-child,
  td:last-child {
    position: sticky;
    left: 0;
    right: 0;
    background-color: var(--background);
    width: 40px;
    min-width: 40px;
    vertical-align: middle;
    padding-left: 10px;
    border-bottom: 1px solid var(--pk);
    z-index: 15;

    &.hovering {
      background-color: var(--secondary-background);
    }
  }
`;

const Thead = styled.thead`
  top: 0;
  position: sticky;
  z-index: 50;
  background-color: var(--background);
  border-bottom: 1px solid var(--pk);

  & tr {
    height: 25px;
  }
`;

const Tbody = styled.tbody`
  & .loading {
    text-align: center;
  }
`;

const NoRows = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;

  & .no-rows {
    text-align: center;
  }
`;
