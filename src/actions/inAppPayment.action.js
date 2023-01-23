import {Config} from '../config';
import {
  inApp_Payment,
  inApp_Payment_success,
  inApp_Payment_error
} from '../constants/common';
import Api from '../services/Api';

export const InAppPayment = () => {
  return {
    type: inApp_Payment,
  };
};
export const InAppPaymentSuccess = payload => {
  return {
    type: inApp_Payment_success,
    payload,
  };
};
export const InAppPaymentError = error => {
  return {
    type: inApp_Payment_error,
    payload: error,
  };
};

export const InAppPaymentRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(InAppPayment());
    Api.MultiPostFetch({
      body: data,
      url: Config.inAppPurchaseAPI,
    })
      .then(response => {
        dispatch(InAppPaymentSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(InAppPaymentError(error));
        failed?.(error);
      });
  };
};
