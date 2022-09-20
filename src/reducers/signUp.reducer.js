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

const initial_state = {
  loading: false,
  signUpInit: {},
  signInInit: {},
  authToken: null,
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  console.log('PAYLOAD',payload)
  switch (type) {
    case sign_Up:
      return {
        ...state,
        loading: true,
      };
    case sign_Up_success:
      return {
        loading: false,
        authToken: payload.token,
        signUpInit: payload,
        error: '',
      };
    case sign_Up_error:
      return {
        loading: false,
        error: payload.error,
      };
    case sign_In:
      return {
        ...state,
        loading: true,
      };
    case sign_In_success:
      return {
        loading: false,
        authToken: payload.token,
        signInInit: payload,
        error: '',
      };
    case sign_In_error:
      return {
        loading: false,
        error: payload.error,
      };
    case user_SignOut:
      return {
        ...state,
        loading: true,
      };
    case user_SignOut_success:
      return initial_state;
    case user_SignOut_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
