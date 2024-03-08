import { useReducer, useContext, createContext } from 'react';

import { MODAL_CONTENT } from '../constants/constants.js';

export const ModalContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case MODAL_CONTENT.addRecord:
      return {
        ...state,
        isOpen: true,
        component: MODAL_CONTENT.addRecord,
        data: action.data,
      };
    case MODAL_CONTENT.editRecord:
      return {
        ...state,
        isOpen: true,
        component: MODAL_CONTENT.editRecord,
        data: action.data,
      };
    case MODAL_CONTENT.addTable:
      return {
        ...state,
        isOpen: true,
        component: MODAL_CONTENT.addTable,
        data: action.data,
      };
    case MODAL_CONTENT.editTable:
      return {
        ...state,
        isOpen: true,
        component: MODAL_CONTENT.editTable,
        data: action.data,
      };
    case MODAL_CONTENT.viewLog:
      return {
        ...state,
        isOpen: true,
        component: MODAL_CONTENT.viewLog,
        data: action.data,
      };
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
        component: null,
        data: null,
      };
    default:
      throw new Error('INVALID OPTION');
  }
}

export const ModalProvider = ({ children }) => {
  const [modalState, modalDispatch] = useReducer(reducer, {
    isOpen: false,
    component: null,
    data: null,
  });

  const actionCreators = {
    close: () => modalDispatch({ type: 'CLOSE' }),
    addRecord: (data) => modalDispatch({ type: MODAL_CONTENT.addRecord, data }),
    editRecord: (data) =>
      modalDispatch({ type: MODAL_CONTENT.editRecord, data }),
    addTable: (data) => modalDispatch({ type: MODAL_CONTENT.addTable, data }),
    editTable: (data) => modalDispatch({ type: MODAL_CONTENT.editTable, data }),
    viewLog: (data) => modalDispatch({ type: MODAL_CONTENT.viewLog, data }),
  };

  return (
    <ModalContext.Provider value={{ modalState, actionCreators }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
