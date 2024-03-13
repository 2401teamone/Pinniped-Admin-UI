import { useReducer } from 'react';
import { TYPES } from '../../constants/constants';

const determineOptions = (type) => {
  switch (type) {
    case 'text':
      return { minLength: 0, maxLength: 255 };
    default:
      throw new Error('invalid type');
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'ADD_COLUMN':
      return { ...state, columns: [...state.columns, action.payload] };
    case 'EDIT_COLUMN':
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.tempId === action.payload.tempId ? action.payload : column
        ),
      };
    case 'REMOVE_COLUMN':
      return {
        ...state,
        columns: state.columns.filter(
          (column) => column.tempId !== action.payload
        ),
      };
  }
};

export default function AddTableForm({ setTables }) {
  const [schema, dispatch] = useReducer(reducer, {
    name: '',
    columns: [],
    getAllRule: '',
    getOneRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
  });

  const addColumn = (type) => {
    const generateID = () => {
      return Math.random().toString(36).substring(7);
    };

    const newField = {
      tempId: generateID(),
      name: '',
      type,
      options: determineOptions(type),
    };

    dispatch({ type: 'ADD_COLUMN', payload: newField });
  };

  const addColumnBar = Object.values(TYPES).map((type) => {
    return (
      <div key={type} className="add-field-btn" onClick={() => addColumn(type)}>
        {type}
      </div>
    );
  });

  return (
    <div className="add-table-form-container">
      {addColumnBar}
      <form className="add-row-form">
        <input
          type="text"
          value={schema.name}
          onChange={(e) => {
            dispatch({ type: 'UPDATE_NAME', payload: e.target.value });
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log('adding', schema);
          }}
        >
          Add Table
        </button>
      </form>
    </div>
  );
}
