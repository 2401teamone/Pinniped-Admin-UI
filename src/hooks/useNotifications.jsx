import { useReducer, useContext, createContext } from 'react';

import { NOTIFICATION_TYPES } from '../constants/constants.js';

export const NotificationContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case NOTIFICATION_TYPES.status:
      return {
        ...state,
        showing: true,
        type: NOTIFICATION_TYPES.status,
        message: action.message,
      };
    case NOTIFICATION_TYPES.error:
      return {
        ...state,
        showing: true,
        type: NOTIFICATION_TYPES.error,
        message: action.message,
      };
    case 'CLOSE':
      return {
        ...state,
        showing: false,
        type: '',
        message: '',
      };
    default:
      throw new Error('INVALID OPTION');
  }
}

export const NotificationProvider = ({ children }) => {
  const [notificationState, notificationDispatch] = useReducer(reducer, {
    showing: false,
    type: '',
    message: '',
  });

  const actionCreators = {
    closeNotification: () => {
      console.log('closing notification');
      notificationDispatch({ type: 'CLOSE' });
    },
    showStatus: (message) =>
      notificationDispatch({ type: NOTIFICATION_TYPES.status, message }),
    showError: (message) =>
      notificationDispatch({ type: NOTIFICATION_TYPES.error, message }),
  };

  return (
    <NotificationContext.Provider value={{ notificationState, actionCreators }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
