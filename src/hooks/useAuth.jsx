import { useState, useEffect } from 'react';

import { useLocation } from 'wouter';

export default function useAuth() {
  const [admin, setAdmin] = useState(null);

  const [, setLocation] = useLocation();

  useEffect(() => {
    const checkIfAdminHasRegistered = async () => {
      return false;
    };
    let adminInStorage = localStorage.getItem('admin');
    adminInStorage = 'nice';
    if (adminInStorage) {
      setAdmin(adminInStorage);
      setLocation('/data');
    } else {
      setAdmin('');
      checkIfAdminHasRegistered().then((res) => {
        if (res) {
          setLocation('/login');
        } else {
          setLocation('/register');
        }
      });
    }
  }, [setAdmin, setLocation]);

  return { admin };
}
