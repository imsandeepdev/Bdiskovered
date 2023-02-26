import {Config} from '../config';
import {
  create_OTP,
  create_OTP_success,
  create_OTP_error
} from '../constants/common';
import Api from '../services/Api';

export const CreateOTP = () => {
  return {
    type: create_OTP,
  };
};
export const CreateOTPSuccess = payload => {
  return {
    type: create_OTP_success,
    payload,
  };
};
export const CreateOTPError = error => {
  return {
    type: create_OTP_error,
    payload: error,
  };
};

export const CreateOTPRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(CreateOTP());
    Api.axiosAuthPost({
      body: data,
      url: Config.createOTPAPI,
    })
      .then(response => {
        dispatch(CreateOTPSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(CreateOTPError(error));
        failed?.(error);
      });
  };
};
