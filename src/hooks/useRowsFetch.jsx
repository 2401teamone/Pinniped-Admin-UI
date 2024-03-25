import api from "../api/api.js";

import { useState, useEffect } from "react";

export default function useFetch(table) {
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
}