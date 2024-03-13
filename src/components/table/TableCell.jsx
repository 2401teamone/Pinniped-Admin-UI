import { useState, useCallback } from 'react';

import Panel from '../utils/Panel';

import PK from './types/PK';
import TextDisplay from './types/TextDisplay';
import SelectDisplay from './types/SelectDisplay';

import Text from '../updaters/Text';
import Select from '../updaters/Select';

import { updateOne } from '../../api';

export default function TableCell({ table, column, row, setRows }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(row[column.name]);

  const handleUpdate = useCallback(() => {
    console.log('update', value);
    updateOne(table.id, row.id, { [column.name]: value }).then((res) => {
      console.log(res.data);
      setRows((prev) => {
        return prev.map((row) => {
          if (row.id === res.data.row.id) {
            return res.data.row;
          }
          return row;
        });
      });
    });
  }, [column.name, row.id, value, table.id, setRows]);

  let staticComponent = null;
  let updateComponent = null;

  switch (column.type) {
    case 'pk':
      staticComponent = <PK id={row.id} />;
      break;
    case 'text':
      staticComponent = <TextDisplay>{value}</TextDisplay>;
      updateComponent = (
        <Text value={value} setValue={setValue} handleUpdate={handleUpdate} />
      );
      break;
    case 'number':
      break;
    case 'boolean':
      break;
    case 'date':
      break;
    case 'email':
      break;
    case 'url':
      break;
    case 'select':
      staticComponent = <SelectDisplay>{value}</SelectDisplay>;
      updateComponent = (
        <Select
          value={value}
          setValue={setValue}
          options={column.options.options}
          handleUpdate={handleUpdate}
          setEditing={setEditing}
        />
      );
      break;
    case 'json':
      break;
    case 'relation':
      break;
    default:
      break;
  }

  return (
    <div className="td size">
      {editing ? (
        <Panel
          setIsOpen={setEditing}
          action={handleUpdate}
          inline={column.type !== 'select'}
        >
          {updateComponent}
        </Panel>
      ) : (
        <div
          className="static size"
          onClick={() => {
            console.log('clicked on: ', column.name);
            if (
              column.type === 'pk' ||
              column.name === 'created_at' ||
              column.name === 'upated_at'
            ) {
              return;
            }
            setEditing(true);
          }}
        >
          {staticComponent || row[column.name]}
        </div>
      )}
    </div>
  );
}
