import {
    user_Location,
    user_Location_success,
    user_Location_error
} from '../constants/common';

const initial_state = {
  loading: false,
  userLocationinit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case user_Location:
      return {
        ...state,
        loading: true,
      };
    case user_Location_success:
      return {
        loading: false,
        userLocationinit: payload,
        error: '',
      };
    case user_Location_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
