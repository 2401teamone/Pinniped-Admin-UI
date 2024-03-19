import { useEffect, useRef } from 'react';

export default function Panel({ setIsOpen, position = 'left', children }) {
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      // e.preventDefault();
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        console.log('closing panel');
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [setIsOpen]);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className={`panel ${position}`} ref={panelRef}>
      {children}
    </div>
  );
}
