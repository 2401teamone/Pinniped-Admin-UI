import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function Panel({
  setIsOpen,
  position = "left",
  children,
  excludeClicksOn,
}) {
  const panelRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        if (excludeClicksOn && excludeClicksOn.contains(e.target)) {
          return;
        }

        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, [setIsOpen, excludeClicksOn]);

  return (
    <PanelWrapper className={position} ref={panelRef}>
      {children}
    </PanelWrapper>
  );
}

const PanelWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 200;
  background-color: inherit;
  /* overflow-y: scroll; */

  &.left {
    left: 0px;
  }

  &.right {
    left: -40px;
    top: 20px;
  }
`;
