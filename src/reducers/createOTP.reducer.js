import {
  create_OTP,
  create_OTP_success,
  create_OTP_error
} from '../constants/common';

const initial_state = {
  loading: false,
  createOTPInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case create_OTP:
      return {
        ...state,
        loading: true,
      };
    case create_OTP_success:
      return {
        loading: false,
        genrateOTPInit: payload,
        error: '',
      };
    case create_OTP_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
