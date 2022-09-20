import {
    tailent_ProfileCreate,
    tailent_ProfileCreate_success,
    tailent_ProfileCreate_error,
    userSelectionFinish,
    userSelectionFinish_success,
    userSelectionFinish_error
} from '../constants/common';

const initial_state = {
  loading: false,
  tailentProfileInit: {},
  userSelectionFinishInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case tailent_ProfileCreate:
      return {
        ...state,
        loading: true,
      };
    case tailent_ProfileCreate_success:
      return {
        loading: false,
        tailentProfileInit: payload,
        error: '',
      };
    case tailent_ProfileCreate_error:
      return {
        loading: false,
        error: payload.error,
      };
    case userSelectionFinish:
      return {
        ...state,
        loading: true,
      };
    case userSelectionFinish_success:
      return {
        loading: false,
        userSelectionFinishInit: payload,
        error: '',
      };
    case userSelectionFinish_error:
      return {
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
