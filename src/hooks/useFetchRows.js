import { useState, useEffect } from "react";
import { useNotificationContext } from "./useNotifications";
import api from "../api/api";

export default function useFetchRows(table, rows, setRows) {
  const [loading, setLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);

  const {
    actionCreators: { showError },
  } = useNotificationContext();

  useEffect(() => {
    async function getRows() {
      const data = await api.getAll(table.id);
      return data;
    }
    const timeoutId = setTimeout(() => {
      setLoading(true);
    }, 50);

    getRows()
      .then((data) => {
        setRows(data.rows);
      })
      .catch((err) => {
        showError(err.message);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
        setHasQueried(true);
      });
  }, [setRows, showError, table.id]);

  return {
    loading,
    hasQueried,
  };
}
