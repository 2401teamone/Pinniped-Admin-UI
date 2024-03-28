import { useState, useEffect } from "react";

export default function useCheckScroll() {
  const [tableIsScrolled, setTableIsScrolled] = useState(false);
  useEffect(() => {
    const table = document.querySelector(".table-container");
    const checkIfTableIsScrolled = () => {
      if (table.scrollLeft > 15) {
        setTableIsScrolled(true);
      } else {
        setTableIsScrolled(false);
      }
    };

    table.addEventListener("scroll", checkIfTableIsScrolled);

    return () => {
      table.removeEventListener("scroll", checkIfTableIsScrolled);
    };
  }, []);

  return {
    tableIsScrolled,
  };
}
