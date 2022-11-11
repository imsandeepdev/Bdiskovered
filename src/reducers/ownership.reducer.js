import {
    change_Ownership,
    change_Ownership_success,
    change_Ownership_error
} from '../constants/common';

const initial_state = {
  loading: false,
  changeOwnerInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case change_Ownership:
      return {
        ...state,
        loading: true,
      };
    case change_Ownership_success:
      return {
        loading: false,
        changeOwnerInit: payload,
        error: '',
      };
    case change_Ownership_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
