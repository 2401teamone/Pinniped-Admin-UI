import { useState } from "react";

import TableCell from "./TableCell";
import Checkbox from "../utils/Checkbox.jsx";

import { useModalContext } from "../../hooks/useModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableRow({
  table,
  row,
  setRows,
  selectedRows,
  setSelectedRows,
  tableIsScrolled,
}) {
  const [hovering, setHovering] = useState(false);

  const {
    actionCreators: { editUser, editRecord },
  } = useModalContext();

  return (
    table && (
      <tr
        className={`tr ${hovering ? "hovering" : ""}`}
        onClick={() => {
          if (table.type === "auth") {
            editUser({ table, row, setRows });
          } else editRecord({ table, row, setRows });
        }}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <td
          className={`sticky-col ${tableIsScrolled ? "shadow" : ""} ${
            hovering ? "hovering" : ""
          }`}
        >
          <Checkbox
            checked={selectedRows.includes(row.id)}
            onChange={() => {
              setSelectedRows((prev) => {
                if (prev.includes(row.id)) {
                  return prev.filter((id) => id !== row.id);
                } else {
                  return [...prev, row.id];
                }
              });
            }}
          />
        </td>
        <TableCell
          table={table}
          column={{ type: "pk", name: "id" }}
          row={row}
        />
        {table.type === "auth" ? (
          <TableCell
            table={table}
            column={{ type: "username", name: "username" }}
            row={row}
          />
        ) : (
          ""
        )}
        {table.columns
          .filter((column) => {
            return column.show;
          })
          .map((column) => {
            return (
              <TableCell
                key={`${column.name}-${row.id}`}
                table={table}
                column={column}
                row={row}
                setRows={setRows}
              />
            );
          })}
        <TableCell
          table={table}
          column={{ type: "created_at", name: "created_at" }}
          row={row}
        />
        <TableCell
          table={table}
          column={{ type: "updated_at", name: "updated_at" }}
          row={row}
        />
        <td className={`sticky-col right-arrow ${hovering ? "hovering" : ""}`}>
          <FontAwesomeIcon icon="fa-regular fa-arrow-right" />
        </td>
      </tr>
    )
  );
}
