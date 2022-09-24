import {
  upload_NewVideo,
  upload_NewVideo_success,
  upload_NewVideo_error
} from '../constants/common';

const initial_state = {
  loading: false,
  uploadNewVideoInit: {},
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

    default:
      return state;
  }
};

export default reducer;
