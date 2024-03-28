import { useRef, memo } from "react";

import { useModalContext } from "../../hooks/useModal";

import TH from "./TableHead";
import TableRow from "./TableRow";
import ActionBox from "../utils/ActionBox";
import Button from "../utils/Button";
import LoadingSpinner from "../utils/LoadingSpinner";

import useFetchRows from "../../hooks/useFetchRows";
import useCheckScroll from "../../hooks/ui/useCheckScroll";
import useAdjustTable from "../../hooks/ui/useAdjustTable";
import useSelectRows from "../../hooks/useSelectRows";

export default memo(function Table({ table, rows, setRows }) {
  const tableRef = useRef();

  const {
    actionCreators: { addUser, addRecord },
  } = useModalContext();

  const { loading, hasQueried } = useFetchRows(table, rows, setRows);
  const { tableIsScrolled } = useCheckScroll();
  const { selectedRows, setSelectedRows } = useSelectRows(table);
  useAdjustTable(tableRef);

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
});
