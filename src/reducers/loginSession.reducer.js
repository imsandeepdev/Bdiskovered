import {
  
  login_Session,
  login_Session_success,
  login_Session_error,
} from '../constants/common';

const initial_state = {
  loading: false,
  loginSessionIntin: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case login_Session:
      return {
        ...state,
        loading: true,
      };
    case login_Session_success:
      return {
        loading: false,
        loginSessionIntin: payload,
        error: '',
      };
    case login_Session_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
