import {
    boost_Post,
    boost_Post_success,
    boost_Post_error
} from '../constants/common';

const initial_state = {
  loading: false,
  boostInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case boost_Post:
      return {
        ...state,
        loading: true,
      };
    case boost_Post_success:
      return {
        loading: false,
        boostInit: payload,
        error: '',
      };
    case boost_Post_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
