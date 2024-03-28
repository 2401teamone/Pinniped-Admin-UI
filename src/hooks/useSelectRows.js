import { useState, useEffect } from "react";

export default function useSelectRows(table) {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setSelectedRows([]);
  }, [table.id]);

  return {
    selectedRows,
    setSelectedRows,
  };
}
