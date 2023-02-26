import {Config} from '../config';
import {
  login_Session,
  login_Session_success,
  login_Session_error,
} from '../constants/common';
import Api from '../services/Api';

export const LoginSession = () => {
  return {
    type: login_Session,
  };
};
export const LoginSessionSuccess = payload => {
  return {
    type: login_Session_success,
    payload,
  };
};
export const LoginSessionError = error => {
  return {
    type: login_Session_error,
    payload: error,
  };
};

export const LoginSessionRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(LoginSession());
    Api.axiosPost({
      body: data,
      url: Config.loginSessionAPI,
    })
      .then(response => {
        dispatch(LoginSessionSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(LoginSessionError(error));
        failed?.(error);
      });
  };
};
