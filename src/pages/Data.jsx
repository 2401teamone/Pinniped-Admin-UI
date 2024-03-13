import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import PageHeader from '../components/utils/PageHeader';
import Crumbs from '../components/utils/Crumbs';
import Button from '../components/utils/Button';
import ActionIcon from '../components/utils/ActionIcon';
import SearchBar from '../components/utils/SearchBar';
import DataNavbar from '../components/DataNavbar';
import Table from '../components/table/Table';

// import { schema } from '../api';

import { useModalContext } from '../hooks/useModal';

import { useLocation, useSearch } from 'wouter';

export default function Data() {
  const [tables, setTables] = useState([]);
  const [rows, setRows] = useState([]);

  const {
    actionCreators: { addRecord, editTable },
  } = useModalContext();

  const [, setLocation] = useLocation();

  const getTableFromQueryString = useCallback((queryString) => {
    const params = new URLSearchParams(queryString);
    return params.get('table');
  }, []);

  const queryString = useSearch();
  const tableName = getTableFromQueryString(queryString);

  const chooseTable = (tableName) => {
    setLocation(`/data?table=${tableName}`);
  };

  const getTable = (tableName) => {
    return tables.find((table) => table.name === tableName);
  };

  useEffect(() => {
    async function getTables() {
      const { data } = await axios.get('http://localhost:3000/api/schema');
      return data;
    }
    getTables().then((res) => {
      console.log(res);
      setTables(res);
    });
  }, []);

  return (
    <div className="data-page">
      <DataNavbar
        tables={tables}
        chooseTable={chooseTable}
        setTables={setTables}
      />

      <div className="data-page-content">
        <PageHeader>
          <div className="left">
            <Crumbs crumbs={['Data', `${tableName}`]} />
            <div className="data-page-action-icons">
              <ActionIcon
                onClick={() =>
                  editTable({ setTables, currentSchema: getTable(tableName) })
                }
              >
                <i className="fa-sharp fa-regular fa-gear"></i>
              </ActionIcon>
              <ActionIcon>
                <i className="fa-light fa-arrows-rotate"></i>
              </ActionIcon>
            </div>
          </div>
          <div className="right">
            <Button
              type="confirm"
              onClick={() => addRecord({ table: getTable(tableName), setRows })}
            >
              <i className="fa-regular fa-plus"></i> Add Record
            </Button>
          </div>
        </PageHeader>
        <SearchBar />
        {tableName && (
          <Table table={getTable(tableName)} rows={rows} setRows={setRows} />
        )}
      </div>
    </div>
  );
}
