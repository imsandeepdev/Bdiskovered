import {
    get_Tailent,
    get_Tailent_success,
    get_Tailent_error
} from '../constants/common';

const initial_state = {
  loading: false,
  getTailentInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case get_Tailent:
      return {
        ...state,
        loading: true,
      };
    case get_Tailent_success:
      return {
        loading: false,
        getTailentInit: payload,
        error: '',
      };
    case get_Tailent_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
