import {
    video_Rating,
    video_Rating_success,
    video_Rating_error
} from '../constants/common';

const initial_state = {
  loading: false,
  videoRateinit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case video_Rating:
      return {
        ...state,
        loading: true,
      };
    case video_Rating_success:
      return {
        loading: false,
        videoRateinit: payload,
        error: '',
      };
    case video_Rating_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
