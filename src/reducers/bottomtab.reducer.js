import {
  bottom_tab,
  bottom_tab_success,
  bottom_tab_error
} from '../constants/common';

const initial_state = {
  loading: false,
  navigatorName: 'HomeScreen',
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case bottom_tab:
      return {
        ...state,
        loading: true,
      };
    case bottom_tab_success:
      return {
        loading: false,
        navigatorName: payload,
        error: '',
      };
    case bottom_tab_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
