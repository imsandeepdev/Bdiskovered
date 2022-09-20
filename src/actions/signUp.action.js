import {Config} from '../config';
import {
  sign_Up,
  sign_Up_success,
  sign_Up_error,
  sign_In,
  sign_In_success,
  sign_In_error,
  user_SignOut,
  user_SignOut_success,
  user_SignOut_error
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

export const SignIn = () => {
  return {
    type: sign_In,
  };
};
export const SignInSuccess = payload => {
  return {
    type: sign_In_success,
    payload,
  };
};
export const SignInError = error => {
  return {
    type: sign_In_error,
    payload: error,
  };
};

export const UserSignOut = () => {
  return {
    type: user_SignOut,
  };
};
export const UserSignOutSuccess = payload => {
  return {
    type: user_SignOut_success,
    payload,
  };
};
export const UserSignOutError = error => {
  return {
    type: user_SignOut_error,
    payload: error,
  };
};

export const SignUpRequest = (
  data,
  dataType,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SignUp());
    Api.RequestPostFetch({
      body: data,
      datatype: dataType,
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


export const SignInRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SignIn());
    Api.RequestPostFetch({
      body: data,
      url: Config.signInAPI,
    })
      .then(response => {
        dispatch(SignInSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(SignInError(error));
        failed?.(error);
      });
  };
};


export const UserSignOutRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(UserSignOut());
    Api.getRequest({
      body: data,
      url: Config.userSignOutAPI,
    })
      .then(response => {
        dispatch(UserSignOutSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(UserSignOutError(error));
        failed?.(error);
      });
  };
};
