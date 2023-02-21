import {
  upload_NewVideo,
  upload_NewVideo_success,
  upload_NewVideo_error,
  post_Delete,
  post_Delete_success,
  post_Delete_error,
  edit_Post,
  edit_Post_success,
  edit_Post_error
} from '../constants/common';

const initial_state = {
  loading: false,
  uploadNewVideoInit: {},
  postDeleteInit: {},
  editPostInit:{},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case upload_NewVideo:
      return {
        ...state,
        loading: true,
      };
    case upload_NewVideo_success:
      return {
        loading: false,
        uploadNewVideoInit: payload,
        error: '',
      };
    case upload_NewVideo_error:
      return {
        loading: false,
        error: payload.error,
      };

    case post_Delete:
      return {
        ...state,
        loading: true,
      };
    case post_Delete_success:
      return {
        loading: false,
        postDeleteInit: payload,
        error: '',
      };
    case post_Delete_error:
      return {
        loading: false,
        error: payload.error,
      };

    case edit_Post:
      return {
        ...state,
        loading: true,
      };
    case edit_Post_success:
      return {
        loading: false,
        editPostInit: payload,
        error: '',
      };
    case edit_Post_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
