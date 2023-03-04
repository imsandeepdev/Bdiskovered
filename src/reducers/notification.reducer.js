import {
    notification_List,
    notification_List_success,
    notification_List_error,
    notification_Delete,
    notification_Delete_success,
    notification_Delete_error
} from '../constants/common';

const initial_state = {
  loading: false,
  notificationInit: {},
  notificationDeleteInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case notification_List:
      return {
        ...state,
        loading: true,
      };
    case notification_List_success:
      return {
        loading: false,
        notificationInit: payload,
        error: '',
      };
    case notification_List_error:
      return {
        loading: false,
        error: payload.error,
      };

    case notification_Delete:
      return {
        ...state,
        loading: true,
      };
    case notification_Delete_success:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case notification_Delete_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
