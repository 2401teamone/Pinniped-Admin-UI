import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableCard = ({ tables, table, chooseTable }) => {
  return (
    <div className="table-card" onClick={() => chooseTable(table.name)}>
      <div className="table-card-header">
        {table.name === "users" || table.name === "_admins" ? (
          <FontAwesomeIcon icon={`fa-light fa-user`} />
        ) : (
          <FontAwesomeIcon icon={`fa-light fa-folder-closed`} />
        )}
        <h3>{table.name}</h3>
      </div>
      <div className="table-card-schema">
        {table.columns.map((column) => (
          <div key={column.name} className="table-card-column">
            <span>{column.name}</span>
            <span>{column.type}</span>
            {column.type === "relation" &&
              tables.find((table) => table.id === column.options.tableId).name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TableDashboard({ tables, chooseTable }) {
  return (
    <div className="table-dashboard">
      {tables.map((table) => (
        <TableCard
          key={table.name}
          tables={tables}
          table={table}
          chooseTable={chooseTable}
        />
      ))}
    </div>
  );
}
