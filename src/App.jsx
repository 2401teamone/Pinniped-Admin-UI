import styled from "styled-components";
import { Router, Route, Switch } from "wouter";

import Navbar from "./components/Navbar";

import Data from "./pages/Data";
import Observability from "./pages/Observability";
import Settings from "./pages/Settings";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SideModal from "./components/utils/SideModal";
import Notification from "./components/utils/Notification";
import ConfirmModal from "./components/utils/ConfirmModal";

import { useNotificationContext } from "./hooks/useNotifications";
import useRouteOnAuth from "./hooks/useRouteOnAuth";
import useDetermineModal from "./hooks/useDetermineModal";
import { useConfirmModalContext } from "./hooks/useConfirmModal";

import GlobalStyles from "./assets/global.js";

import { LINKS } from "./constants/constants";

export default function App() {
  const { notificationState } = useNotificationContext();
  const { admin } = useRouteOnAuth();
  const { isOpen, modalContent, close } = useDetermineModal();
  const { confirmModalState, actionCreators } = useConfirmModalContext();

  return (
    <AppWrapper id="app">
      {!admin && (
        <Router base="/_">
          <Switch>
            <Route path={`/login`} component={Login} />
            <Route path={`/register`} component={Register} />
          </Switch>
        </Router>
      )}
      {admin && (
        <Main className="main">
          <>
            <Navbar />
            <Page className="page">
              <Router base="/_">
                <Switch>
                  <Route path={`/${LINKS.data}`} component={Data} />
                  <Route
                    path={`/${LINKS.observability}`}
                    component={Observability}
                  />
                  <Route path={`/${LINKS.settings}`} component={Settings} />
                </Switch>
              </Router>
            </Page>
          </>
        </Main>
      )}
      <div>
        {isOpen && <SideModal onClose={close}>{modalContent}</SideModal>}
      </div>
      <div>
        {confirmModalState.isOpen && (
          <ConfirmModal
            onClose={actionCreators.close}
            onConfirm={confirmModalState.onConfirm}
            no={confirmModalState.no}
            yes={confirmModalState.yes}
          >
            {confirmModalState.message}
          </ConfirmModal>
        )}
      </div>
      <div>
        {notificationState.showing && (
          <Notification type={notificationState.type}>
            {Array.isArray(notificationState.message)
              ? notificationState.message.map((msg, i) => <p key={i}>{msg}</p>)
              : notificationState.message}
          </Notification>
        )}
      </div>
      <GlobalStyles />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: var(--navbar-width) 1fr;
  grid-template-rows: auto;
  grid-template-areas: "navbar page";
  min-height: inherit;
`;

const Page = styled.section`
  grid-area: page;
  min-height: 100vh;
  background-color: var(--background);
`;
