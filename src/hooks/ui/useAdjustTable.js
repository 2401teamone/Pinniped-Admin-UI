import { useEffect } from "react";

export default function useAdjustTable(tableRef) {
  useEffect(() => {
    const adjustTableHeight = () => {
      const availableHeight = window.innerHeight - 145 - 50;

      tableRef.current.style.maxHeight = availableHeight + "px";
    };

    adjustTableHeight();
    window.addEventListener("resize", adjustTableHeight);
    return () => {
      window.removeEventListener("resize", adjustTableHeight);
    };
  }, [tableRef]);
}
