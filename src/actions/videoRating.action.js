import {Config} from '../config';
import {
  video_Rating,
  video_Rating_success,
  video_Rating_error
} from '../constants/common';
import Api from '../services/Api';

export const VideoRating = () => {
  return {
    type: video_Rating,
  };
};
export const VideoRatingSuccess = payload => {
  return {
    type: video_Rating_success,
    payload,
  };
};
export const VideoRatingError = error => {
  return {
    type: video_Rating_error,
    payload: error,
  };
};

export const VideoRatingRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(VideoRating());
    Api.axiosPost({
      body:data,
      url: Config.videoRatingAPI,
    })
      .then(response => {
        dispatch(VideoRatingSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(VideoRatingError(error));
        failed?.(error);
      });
  };
};
