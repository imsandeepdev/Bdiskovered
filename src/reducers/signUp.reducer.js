import {
    sign_Up,
    sign_Up_success,
    sign_Up_error
} from '../constants/common';

const initial_state = {
  loading: false,
  signUpInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case sign_Up:
      return {
        ...state,
        loading: true,
      };
    case sign_Up_success:
      return {
        loading: false,
        signUpInit: payload,
        error: '',
      };
    case sign_Up_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
