import { createRoot } from 'react-dom/client';

import App from './App.jsx';

import './assets/reset.css';
import './assets/index.css';

import { ModalProvider } from './hooks/useModal.jsx';
import { NotificationProvider } from './hooks/useNotifications.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';

createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </NotificationProvider>
);
