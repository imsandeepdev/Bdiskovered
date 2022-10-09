import {
    connected_Users,
    connected_Users_success,
    connected_Users_error
} from '../constants/common';

const initial_state = {
  loading: false,
  connectUserInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case connected_Users:
      return {
        ...state,
        loading: true,
      };
    case connected_Users_success:
      return {
        loading: false,
        connectUserInit: payload,
        error: '',
      };
    case connected_Users_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
