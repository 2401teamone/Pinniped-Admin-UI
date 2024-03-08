import { Route, Switch } from 'wouter';

import Navbar from './components/Navbar';

import Data from './pages/Data';
import Observability from './pages/Observability';
import Settings from './pages/Settings';
import SideModal from './components/utils/SideModal';
import EditRowForm from './components/forms/EditRowForm';
import AddTableForm from './components/forms/AddTableForm';
import EditTableForm from './components/forms/EditTableForm';
import LogView from './components/LogView';

import { useModalContext } from './hooks/useModal';

import { LINKS, MODAL_CONTENT } from './constants/constants';

function App() {
  const {
    modalState: { isOpen, component, data },
    actionCreators,
  } = useModalContext();

  let modalContent = null;
  switch (component) {
    case MODAL_CONTENT.addRecord:
      modalContent = 'add record';
      break;
    case MODAL_CONTENT.editRecord:
      modalContent = <EditRowForm row={data} />;
      break;
    case MODAL_CONTENT.addTable:
      modalContent = <AddTableForm />;
      break;
    case MODAL_CONTENT.editTable:
      modalContent = <EditTableForm table={data} />;
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
    </div>
  );
}

export default App;
