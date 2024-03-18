import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'ON_CHANGE':
      return { ...state, [action.payload.column]: action.payload.value };
    case 'ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: '' };
    default:
      return state;
  }
}

export default function useRowFormReducer(initialState) {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const { onChange, setError, clearError } = {
    onChange: (column, value) => {
      dispatch({ type: 'ON_CHANGE', payload: { column, value } });
    },
    setError: (error) => {
      dispatch({ type: 'ERROR', payload: error });
    },
    clearError: () => {
      dispatch({ type: 'CLEAR_ERROR' });
    },
  };

  return {
    formState,
    onChange,
    setError,
    clearError,
  };
}
