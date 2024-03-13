import { useEffect, useRef } from 'react';

export default function Panel({ setIsOpen, children }) {
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [setIsOpen]);

  return (
    <div className={`panel`} ref={panelRef}>
      {children}
    </div>
  );
}
