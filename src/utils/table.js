export default class Table {
  constructor(table) {
    this.id = table.id;
    this.name = table.name;
    this.type = table.type;
    this.columns = table.columns;
    this.options = table.options;
  }

  generateInitialState() {
    return this.columns.reduce((acc, column) => {
      switch (column.type) {
        case "bool":
          acc[column.name] = 0;
          break;
        case "date":
          acc[column.name] = new Date().toISOString().split("T")[0];
          break;
        case "relation":
          acc[column.name] = null;
          break;
        case "select":
          acc[column.name] = [];
          break;
        default:
          acc[column.name] = "";
      }

      return acc;
    }, {});
  }
}
