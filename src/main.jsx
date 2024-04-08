import { createRoot } from "react-dom/client";

import App from "./App.jsx";

// import "./assets/reset.css";
import "./assets/index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { all } from "@awesome.me/kit-9d86f6836c/icons";

library.add(...all);

import ErrorBoundary from "./components/utils/ErrorBoundary.jsx";
import { ModalProvider } from "./hooks/useModal.jsx";
import { NotificationProvider } from "./hooks/useNotifications.jsx";
import { ConfirmModalProvider } from "./hooks/useConfirmModal.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <NotificationProvider>
      <AuthProvider>
        <ConfirmModalProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ConfirmModalProvider>
      </AuthProvider>
    </NotificationProvider>
  </ErrorBoundary>
);
