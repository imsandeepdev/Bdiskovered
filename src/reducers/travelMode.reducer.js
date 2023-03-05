import {
  travel_mode,
  travel_mode_success,
  travel_mode_error
} from '../constants/common';

const initial_state = {
  loading: false,
  travelModeInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case travel_mode:
      return {
        ...state,
        loading: true,
      };
    case travel_mode_success:
      return {
        loading: false,
        travelModeInit: payload,
        error: '',
      };
    case travel_mode_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
