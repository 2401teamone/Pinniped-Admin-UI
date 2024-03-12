import { useState, useCallback } from 'react';
import Panel from './Panel';
import TextUpdate from '../cells/TextUpdate';

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

  // let staticComponent = null;
  let updateComponent = null;

  switch (column.type) {
    case 'pk':
      // staticComponent = <PK />;
      break;
    case 'text':
      // staticComponent = <TextStatic />;
      updateComponent = (
        <TextUpdate
          value={value}
          setValue={setValue}
          handleUpdate={handleUpdate}
        />
      );
      break;
  }

  const copyId = () => {
    navigator.clipboard.writeText(row[column.name]);
  };

  return (
    <td className="td">
      <span>
        <span className="copy-id" onClick={copyId}>
          {column.type === 'pk' ? <i className="fa-light fa-copy"></i> : ''}
        </span>
        <span>
          {editing ? (
            <Panel setIsOpen={setEditing}>{updateComponent}</Panel>
          ) : (
            <span
              className="cell-value"
              onClick={() => {
                console.log('click');
                setEditing(true);
              }}
            >
              {row[column.name] || 'null'}
            </span>
          )}
        </span>
      </span>
    </td>
  );
}
