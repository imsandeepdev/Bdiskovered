import {
  pay_Payment,
  pay_Payment_success,
  pay_Payment_error
} from '../constants/common';

const initial_state = {
  loading: false,
  payPaymentInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case pay_Payment:
      return {
        ...state,
        loading: true,
      };
    case pay_Payment_success:
      return {
        loading: false,
        payPaymentInit: payload,
        error: '',
      };
    case pay_Payment_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
