import { Route, Switch } from 'wouter';

import Navbar from './components/Navbar';

import Data from './pages/Data';
import Observability from './pages/Observability';
import Settings from './pages/Settings';
// import Auth from './pages/Auth';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import SideModal from './components/utils/SideModal';
import Notification from './components/utils/Notification';

import TableForm from './components/forms/TableForm';
import RowForm from './components/forms/RowForm';
import LogView from './components/LogView';

import { useModalContext } from './hooks/useModal';
import { useNotificationContext } from './hooks/useNotifications';
import useAuth from './hooks/useAuth';

import { LINKS, MODAL_CONTENT } from './constants/constants';

import { useLocation } from 'wouter';

function App() {
  console.log('app');
  const {
    modalState: { isOpen, component, data },
    actionCreators,
  } = useModalContext();

  const { notificationState } = useNotificationContext();

  const { admin, adminRegistered } = useAuth();

  let modalContent = null;
  switch (component) {
    case MODAL_CONTENT.addRecord:
      modalContent = (
        <RowForm
          table={data.table}
          row={null}
          setRows={data.setRows}
          closeModal={actionCreators.close}
        />
      );
      break;
    case MODAL_CONTENT.editRecord:
      modalContent = (
        <RowForm
          table={data.table}
          row={data.row}
          setRows={data.setRows}
          closeModal={actionCreators.close}
        />
      );
      break;
    case MODAL_CONTENT.addTable:
      modalContent = (
        <TableForm
          tables={data.tables}
          setTables={data.setTables}
          closeModal={actionCreators.close}
        />
      );
      break;
    case MODAL_CONTENT.editTable:
      modalContent = (
        <TableForm
          tables={data.tables}
          setTables={data.setTables}
          closeModal={actionCreators.close}
          currentSchema={data.currentSchema}
        />
      );
      break;
    case 'VIEW_LOG':
      modalContent = <LogView log={data} />;
      break;
    default:
      modalContent = null;
  }

  return (
    <div id="app">
      <Route path={`/login`} component={Login} />
      <Route path={`/register`} component={Register} />
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
          {isOpen && (
            <SideModal onClose={actionCreators.close}>{modalContent}</SideModal>
          )}
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
