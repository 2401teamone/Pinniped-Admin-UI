import { useModalContext } from './useModal';

import { MODAL_CONTENT } from '../constants/constants';

import TableForm from '../components/forms/TableForm.jsx';
import RowForm from '../components/forms/RowForm.jsx';
import LogView from '../components/LogView';

export default function useDetermineModal() {
  const {
    modalState: { isOpen, component, data },
    actionCreators,
  } = useModalContext();

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
      break;
  }

  return { isOpen, modalContent, close: actionCreators.close };
}
