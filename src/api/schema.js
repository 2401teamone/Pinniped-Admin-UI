import axios from 'axios';

export const createTable = async (data) => {
  const res = await axios.post('http://localhost:3000/api/schema', data);
  return res.data;
};

export const editTable = async (tableId, data) => {
  const res = await axios.put(
    `http://localhost:3000/api/schema/${tableId}`,
    data
  );
  return res.data;
};
