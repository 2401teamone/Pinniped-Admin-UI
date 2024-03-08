import NavRow from './utils/NavRow';
import Button from './utils/Button';
import Delim from './utils/Delim';
import SubNavbar from './utils/SubNavbar';

import { useLocation, useSearch } from 'wouter';

import { useModalContext } from '../hooks/useModal';

export default function DataNavbar({ tables, chooseTable }) {
  const {
    actionCreators: { addTable },
  } = useModalContext();

  return (
    <SubNavbar>
      <div className="data-page-navbar">
        <Button type="primary" onClick={() => addTable()}>
          + New Collection
        </Button>
        <Delim />
        <div className="nav-rows">
          {tables.length &&
            tables.map((table) => {
              return (
                <NavRow
                  key={table.name}
                  // active={table.name === currentTable}

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
