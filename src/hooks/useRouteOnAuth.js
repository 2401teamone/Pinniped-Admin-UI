import { useEffect } from 'react';

import { useAuthContext } from './useAuth';

import { useLocation } from 'wouter';

export default function useRouteOnAuth() {
  const { admin, setAdmin, adminInStorage, adminHasRegistered } =
    useAuthContext();

  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!admin) {
      adminInStorage().then((res) => {
        if (res) {
          setAdmin(res);
        } else {
          adminHasRegistered().then((res) => {
            if (res) {
              if (!admin) setLocation('/login');
            } else {
              if (!admin) setLocation('/register');
            }
          });
        }
      });
    }
  }, [admin, adminInStorage, adminHasRegistered, setAdmin, setLocation]);

  return { admin };
}
