import {Config} from '../config';
import {
    post_Filter,
    post_Filter_success,
    post_Filter_error
} from '../constants/common';
import Api from '../services/Api';

export const PostFilter = () => {
  return {
    type: post_Filter,
  };
};
export const PostFilterSuccess = payload => {
  return {
    type: post_Filter_success,
    payload,
  };
};
export const PostFilterError = error => {
  return {
    type: post_Filter_error,
    payload: error,
  };
};

export const PostFilterRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(PostFilter());
    Api.axiosPost({
      body: data,
      url: Config.postFilterAPI,
    })
      .then(response => {
        dispatch(PostFilterSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(PostFilterError(error));
        failed?.(error);
      });
  };
};
