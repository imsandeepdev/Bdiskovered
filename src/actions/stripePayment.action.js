import {Config} from '../config';
import {
  pay_Payment,
  pay_Payment_success,
  pay_Payment_error
} from '../constants/common';
import Api from '../services/Api';

export const PayPayment = () => {
  return {
    type: pay_Payment,
  };
};
export const PayPaymentSuccess = payload => {
  return {
    type: pay_Payment_success,
    payload,
  };
};
export const PayPaymentError = error => {
  return {
    type: pay_Payment_error,
    payload: error,
  };
};

export const PayPaymentRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(PayPayment());
    Api.MultiPostFetch({
      body: data,
      url: Config.stripePaymentAPI,
    })
      .then(response => {
        dispatch(PayPaymentSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(PayPaymentError(error));
        failed?.(error);
      });
  };
};
