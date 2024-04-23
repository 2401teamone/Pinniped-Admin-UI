export const validate = (schema, tables, existingId, isNew, currentSchema) => {
  const errors = [];
  if (!schema.name.length) {
    errors.push("Table name is required.");
  }
  if (!schema.name.match(/^[a-zA-Z0-9_]+$/)) {
    errors.push("Table name must be alphanumeric and contain no spaces.");
  }
  if (schema.name.length > 20) {
    errors.push("Table name must be 20 characters or less.");
  }

  if (
    tables.some((table) => {
      if (isNew() && table.name === schema.name) {
        return true;
      } else if (
        !isNew() &&
        table.name === schema.name &&
        table.id !== existingId
      ) {
        return true;
      }
    })
  ) {
    errors.push("Table name must be unique.");
  }

  if (currentSchema.type === "base" && !schema.columns.length) {
    errors.push("At least one column is required.");
  }
  if (!schema.columns.every((column) => column.name.length)) {
    errors.push("All columns must have a name.");
  }
  if (!schema.columns.every((column) => column.type)) {
    errors.push("All columns must have a type.");
  }

  let colNames = schema.columns.map((column) => column.name);
  if (colNames.length !== new Set(colNames).size) {
    errors.push("Column names must be unique.");
  }

  for (let col of schema.columns) {
    if (col.type !== "relation") continue;
    if (!col.options.tableId) {
      errors.push("Relation columns must have a table selected.");
    }
  }

  return errors;
};
