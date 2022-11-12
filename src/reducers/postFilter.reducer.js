import {
  post_Filter,
  post_Filter_success,
  post_Filter_error
} from '../constants/common';

const initial_state = {
  loading: false,
  postFilterinit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case post_Filter:
      return {
        ...state,
        loading: true,
      };
    case post_Filter_success:
      return {
        loading: false,
        postFilterinit: payload,
        error: '',
      };
    case post_Filter_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
