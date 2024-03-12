import axios from 'axios';

export const createOne = async (tableId, data) => {
  const res = await axios.post(
    `http://localhost:3000/api/tables/${tableId}/rows`,
    data
  );
  return res;
};

export const updateOne = async (tableId, rowId, data) => {
  const res = await axios.patch(
    `http://localhost:3000/api/tables/${tableId}/rows/${rowId}`,
    data
  );
  return res;
};

export const deleteOne = async (tableId, rowId) => {
  const res = await axios.delete(
    `http://localhost:3000/api/tables/${tableId}/rows/${rowId}`
  );
  return res;
};
