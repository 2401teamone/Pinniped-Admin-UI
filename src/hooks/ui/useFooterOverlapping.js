import { useState, useEffect } from "react";

export default function useFooterOverlapping(table) {
  const [footerOverlapping, setFooterOverlapping] = useState(false);

  useEffect(() => {
    if (table) {
      const footerIsOverlapping = () => {
        const table = document
          .querySelector(".table-wrapper")
          .getBoundingClientRect();
        const footer = document
          .querySelector(".footer")
          .getBoundingClientRect();

        const overlapping = !(footer.top > table.bottom);

        if (overlapping) {
          setFooterOverlapping(true);
        } else setFooterOverlapping(false);
      };

      footerIsOverlapping();

      window.addEventListener("resize", footerIsOverlapping);
      return () => {
        window.removeEventListener("resize", footerIsOverlapping);
      };
    }
  }, [table, setFooterOverlapping]);

  return footerOverlapping;
}
