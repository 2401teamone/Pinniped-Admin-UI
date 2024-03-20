import { useEffect, useRef } from 'react';

export default function Panel({ setIsOpen, position = 'left', children }) {
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        console.log('closing panel');
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler, true);

    return () => {
      setIsOpen(false);
      document.removeEventListener('click', handler);
    };
  }, [setIsOpen]);

  return (
    <div className={`panel ${position}`} ref={panelRef}>
      {children}
    </div>
  );
}
