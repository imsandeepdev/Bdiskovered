import {Config} from '../config';
import {
  sign_Up,
  sign_Up_success,
  sign_Up_error
} from '../constants/common';
import Api from '../services/Api';

export const SignUp = () => {
  return {
    type: sign_Up,
  };
};
export const SignUpSuccess = payload => {
  return {
    type: sign_Up_success,
    payload,
  };
};
export const SignUpError = error => {
  return {
    type: sign_Up_error,
    payload: error,
  };
};

export const SignUpRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SignUp());
    Api.RequestPostFetch({
      body: data,
      url: Config.signUpAPI,
    })
      .then(response => {
        dispatch(SignUpSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(SignUpError(error));
        failed?.(error);
      });
  };
};
