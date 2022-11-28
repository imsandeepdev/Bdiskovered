import {
  connect_Request,
  connect_Request_success,
  connect_Request_error
} from '../constants/common';

const initial_state = {
  loading: false,
  connRequestInIt: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case connect_Request:
      return {
        ...state,
        loading: true,
      };
    case connect_Request_success:
      return {
        loading: false,
        connRequestInIt: payload,
        error: '',
      };
    case connect_Request_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
