import {
    notification_List,
    notification_List_success,
    notification_List_error
} from '../constants/common';

const initial_state = {
  loading: false,
  notificationInit: {},
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

    default:
      return state;
  }
};

export default reducer;
