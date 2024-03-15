import { Route, Switch } from 'wouter';

import Navbar from './components/Navbar';

import Data from './pages/Data';
import Observability from './pages/Observability';
import Settings from './pages/Settings';
import SideModal from './components/utils/SideModal';
import Notification from './components/utils/Notification';
import EditRowForm from './components/forms/EditRowForm';
import TableForm from './components/forms/TableForm';
import RowForm from './components/forms/RowForm';
import LogView from './components/LogView';

import { useModalContext } from './hooks/useModal';
import { useNotificationContext } from './hooks/useNotifications';

import { LINKS, MODAL_CONTENT } from './constants/constants';

function App() {
  const {
    modalState: { isOpen, component, data },
    actionCreators,
  } = useModalContext();

  const { notificationState } = useNotificationContext();

  let modalContent = null;
  switch (component) {
    case MODAL_CONTENT.addRecord:
      modalContent = (
        <RowForm
          table={data.table}
          setRows={data.setRows}
          closeModal={actionCreators.close}
        />
      );
      break;
    case MODAL_CONTENT.editRecord:
      modalContent = <EditRowForm row={data} />;
      break;
    case MODAL_CONTENT.addTable:
      modalContent = (
        <TableForm
          setTables={data.setTables}
          closeModal={actionCreators.close}
        />
      );
      break;
    case MODAL_CONTENT.editTable:
      modalContent = (
        <TableForm
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
      <Navbar />
      <div className="page">
        <Switch>
          <Route path={`/${LINKS.data}`} component={Data} />
          <Route path={`/${LINKS.observability}`} component={Observability} />
          <Route path={`/${LINKS.settings}`} component={Settings} />
        </Switch>
      </div>
      <div>
        {isOpen && (
          <SideModal onClose={actionCreators.close}>{modalContent}</SideModal>
        )}
      </div>
      <div>
        {notificationState.showing && (
          <Notification type={notificationState.type}>
            {notificationState.message}
          </Notification>
        )}
      </div>
    </div>
  );
}

export default App;
