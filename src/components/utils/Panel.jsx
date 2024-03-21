import { useEffect, useRef } from "react";

export default function Panel({
  setIsOpen,
  position = "left",
  children,
  excludeClicksOn,
}) {
  const panelRef = useRef(null);
  console.log("panel rendered");
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        if (excludeClicksOn && excludeClicksOn.contains(e.target)) {
          return;
        }

        console.log("closing panel");
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, [setIsOpen, excludeClicksOn]);

  return (
    <div className={`panel ${position}`} ref={panelRef}>
      {children}
    </div>
  );
}
