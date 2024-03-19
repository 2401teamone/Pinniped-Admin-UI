import { Route, Switch } from 'wouter';

import Navbar from './components/Navbar';

import Data from './pages/Data';
import Observability from './pages/Observability';
import Settings from './pages/Settings';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SideModal from './components/utils/SideModal';
import Notification from './components/utils/Notification';

import { useNotificationContext } from './hooks/useNotifications';
import useRouteOnAuth from './hooks/useRouteOnAuth';
import useDetermineModal from './hooks/useDetermineModal';

import { LINKS } from './constants/constants';

function App() {
  console.log('app');

  const { notificationState } = useNotificationContext();
  const { admin } = useRouteOnAuth();
  const { isOpen, modalContent, close } = useDetermineModal();

  return (
    <div id="app">
      {!admin && (
        <Switch>
          <Route path={`/login`} component={Login} />
          <Route path={`/register`} component={Register} />
        </Switch>
      )}
      <div>
        {admin && (
          <div>
            <Navbar />
            <div className="page">
              <Switch>
                <Route path={`/${LINKS.data}`} component={Data} />
                <Route
                  path={`/${LINKS.observability}`}
                  component={Observability}
                />
                <Route path={`/${LINKS.settings}`} component={Settings} />
              </Switch>
            </div>
          </div>
        )}
        <div>
          {isOpen && <SideModal onClose={close}>{modalContent}</SideModal>}
        </div>
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
    </div>
  );
}

export default App;
