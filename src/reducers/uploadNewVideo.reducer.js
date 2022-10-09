import {
  upload_NewVideo,
  upload_NewVideo_success,
  upload_NewVideo_error,
  post_Delete,
  post_Delete_success,
  post_Delete_error
} from '../constants/common';

const initial_state = {
  loading: false,
  uploadNewVideoInit: {},
  postDeleteInit: {},
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

    default:
      return state;
  }
};

export default reducer;
