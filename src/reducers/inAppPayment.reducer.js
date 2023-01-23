import {
  inApp_Payment,
  inApp_Payment_success,
  inApp_Payment_error
} from '../constants/common';

const initial_state = {
  loading: false,
  inAppPaymentInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case inApp_Payment:
      return {
        ...state,
        loading: true,
      };
    case inApp_Payment_success:
      return {
        loading: false,
        inAppPaymentInit: payload,
        error: '',
      };
    case inApp_Payment_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
