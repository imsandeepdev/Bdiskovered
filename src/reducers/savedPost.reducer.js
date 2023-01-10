import {
  saved_Post,
  saved_Post_success,
  saved_Post_error,
  saved_Post_List,
  saved_Post_List_success,
  saved_Post_List_error,
  delete_Saved_Post,
  delete_Saved_Post_success,
  delete_Saved_Post_error,
} from '../constants/common';

const initial_state = {
  loading: false,
  savedPostinit: {},
  savedPostListinit: {},
  deleteSavedPostinit: {},

  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case saved_Post:
      return {
        ...state,
        loading: true,
      };
    case saved_Post_success:
      return {
        loading: false,
        savedPostinit: payload,
        error: '',
      };
    case saved_Post_error:
      return {
        loading: false,
        error: payload.error,
      };

    case saved_Post_List:
      return {
        ...state,
        loading: true,
      };
    case saved_Post_List_success:
      return {
        loading: false,
        savedPostListinit: payload,
        error: '',
      };
    case saved_Post_List_error:
      return {
        loading: false,
        error: payload.error,
      };

    case delete_Saved_Post:
      return {
        ...state,
        loading: true,
      };
    case delete_Saved_Post_success:
      return {
        loading: false,
        deleteSavedPostinit: payload,
        error: '',
      };
    case delete_Saved_Post_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
