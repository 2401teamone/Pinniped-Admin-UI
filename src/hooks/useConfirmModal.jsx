import { useReducer, useContext, createContext } from "react";

export const ConfirmModalContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        isOpen: true,
        message: action.message,
        onConfirm: action.onConfirm,
      };
    case "CLOSE":
      return {
        ...state,
        isOpen: false,
        message: action.message,
        onConfirm: action.onConfirm,
      };
    default:
      throw new Error("INVALID OPTION");
  }
}

export const ConfirmModalProvider = ({ children }) => {
  const [confirmModalState, confirmModalDispatch] = useReducer(reducer, {
    isOpen: false,
  });

  const actionCreators = {
    close: () => confirmModalDispatch({ type: "CLOSE" }),
    open: (message, onConfirm = undefined) =>
      confirmModalDispatch({ type: "OPEN", message, onConfirm }),
  };

  return (
    <ConfirmModalContext.Provider value={{ confirmModalState, actionCreators }}>
      {children}
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModalContext = () => {
  return useContext(ConfirmModalContext);
};
