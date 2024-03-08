import { createRoot } from 'react-dom/client';

import App from './App.jsx';

import './assets/reset.css';
import './assets/index.css';

import { ModalProvider } from './hooks/useModal.jsx';

createRoot(document.getElementById('root')).render(
  <ModalProvider>
    <App />
  </ModalProvider>
);
