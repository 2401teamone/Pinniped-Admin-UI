import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableCard = ({
  tables,
  table,
  chooseTable,
  relatedTable,
  setRelatedTable,
}) => {
  const [showSystemFields, setShowSystemFields] = useState(false);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [showApiRules, setShowApiRules] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  return (
    <div
      className={`table-card ${
        relatedTable === table.name ? "highlight-relation" : ""
      }`}
    >
      <div className="table-card-header">
        <div className="name">
          {table.name === "users" || table.name === "_admins" ? (
            <FontAwesomeIcon icon={`fa-light fa-user`} />
          ) : (
            <FontAwesomeIcon icon={`fa-light fa-folder-closed`} />
          )}
          <h3>{table.name}</h3>
        </div>
        <div className="actions">
          <FontAwesomeIcon
            className="edit-icon"
            icon={`fa-light fa-edit`}
            onClick={() => chooseTable(table.name)}
          />
          <FontAwesomeIcon
            icon={`fa-light fa-copy`}
            className="copy"
            onClick={() => {
              window.navigator.clipboard.writeText(table.id);
            }}
          />
          <FontAwesomeIcon
            icon="fa-light fa-eye"
            className="view"
            onClick={() => {
              if (!viewAll) {
                setShowApiRules(true);
                setShowCustomFields(true);
                setShowSystemFields(true);
                setViewAll(true);
              } else {
                setShowApiRules(false);
                setShowCustomFields(false);
                setShowSystemFields(false);
                setViewAll(false);
              }
            }}
          />
        </div>
      </div>
      <div className="table">
        <div
          className="fields-header"
          onClick={(e) => {
            e.stopPropagation();
            setShowSystemFields(!showSystemFields);
          }}
        >
          <h2>System Fields</h2>
          <FontAwesomeIcon
            icon={`fa-light fa-chevron-${showSystemFields ? "down" : "right"}`}
          />
        </div>
        {!showSystemFields ? (
          ""
        ) : (
          <>
            <div className="table-card-system">
              <div className="table-card-column">
                <span>ID</span>
                <span>String</span>
              </div>
              <div className="table-card-column">
                <span>Created At</span>
                <span>Date</span>
              </div>
              <div className="table-card-column">
                <span>Updated At</span>
                <span>Date</span>
              </div>
              {table.type !== "auth" ? (
                ""
              ) : (
                <>
                  <div className="table-card-column">
                    <span>Username</span>
                    <span>String</span>
                  </div>
                  <div className="table-card-column">
                    <span>Password</span>
                    <span>String</span>
                  </div>
                  <div className="table-card-column">
                    <span>Role</span>
                    <span>String</span>
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <div
          className="fields-header"
          onClick={(e) => {
            e.stopPropagation();
            setShowCustomFields(!showCustomFields);
          }}
        >
          <h2>Custom Fields</h2>
          <FontAwesomeIcon
            icon={`fa-light fa-chevron-${showCustomFields ? "down" : "right"}`}
          />
        </div>
        {!showCustomFields ? (
          ""
        ) : (
          <>
            <div className="table-card-schema">
              {table.columns.length === 0 ? (
                <span className="no-custom-fields">No custom fields</span>
              ) : (
                table.columns.map((column) => (
                  <div
                    key={column.name}
                    className="table-card-column"
                    onMouseOver={(e) => {
                      e.stopPropagation();
                      if (column.type === "relation") {
                        const relatedTable = tables.find(
                          (table) => table.id === column.options.tableId
                        ).name;
                        setRelatedTable(relatedTable);
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setRelatedTable(null);
                    }}
                  >
                    <span>{column.name}</span>
                    <span>{column.type}</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
        <div
          className="fields-header"
          onClick={() => setShowApiRules(!showApiRules)}
        >
          <h2>API Rules</h2>
          <FontAwesomeIcon
            icon={`fa-light fa-chevron-${showApiRules ? "down" : "right"}`}
          />
        </div>
        {!showApiRules ? (
          ""
        ) : (
          <>
            <div className="api-rules">
              <div className="get-all-rule">
                <span>Get All</span>
                <span>{table.getAllRule}</span>
              </div>
              <div className="get-all-rule">
                <span>Get One</span>
                <span>{table.getOneRule}</span>
              </div>
              <div className="get-all-rule">
                <span>Create</span>
                <span>{table.createRule}</span>
              </div>
              <div className="get-all-rule">
                <span>Update</span>
                <span>{table.updateRule}</span>
              </div>
              <div className="get-all-rule">
                <span>Delete</span>
                <span>{table.deleteRule}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function TableDashboard({ tables, chooseTable }) {
  const [relatedTable, setRelatedTable] = useState(null);

  return (
    <div className="table-dashboard">
      {tables
        .filter((table) => table.name !== "admins")
        .map((table) => (
          <TableCard
            key={table.name}
            tables={tables}
            table={table}
            chooseTable={chooseTable}
            relatedTable={relatedTable}
            setRelatedTable={setRelatedTable}
          />
        ))}
    </div>
  );
}
