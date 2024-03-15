import NavRow from './utils/NavRow';
import Button from './utils/Button';
import Delim from './utils/Delim';
import SubNavbar from './utils/SubNavbar';

import { useModalContext } from '../hooks/useModal';

export default function DataNavbar({
  tables,
  chooseTable,
  setTables,
  currentTable,
}) {
  const {
    actionCreators: { addTable },
  } = useModalContext();

  return (
    <SubNavbar>
      <div className="data-page-navbar">
        <Button type="primary" onClick={() => addTable({ tables, setTables })}>
          + New Table
        </Button>
        <div className="nav-rows">
          <NavRow
            active={currentTable === 'users'}
            // onClick={() => chooseTable('users')}
          >
            Users
          </NavRow>
          {tables.length &&
            tables.map((table) => {
              return (
                <NavRow
                  key={table.name}
                  active={table.name === currentTable}
                  onClick={() => chooseTable(table.name)}
                >
                  {table.name}
                </NavRow>
              );
            })}
        </div>
      </div>
    </SubNavbar>
  );
}
