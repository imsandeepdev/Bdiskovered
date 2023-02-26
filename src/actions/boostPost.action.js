import {Config} from '../config';
import {
    boost_Post,
    boost_Post_success,
    boost_Post_error
} from '../constants/common';
import Api from '../services/Api';

export const BoostPost = () => {
  return {
    type: boost_Post,
  };
};
export const BoostPostSuccess = payload => {
  return {
    type: boost_Post_success,
    payload,
  };
};
export const BoostPostError = error => {
  return {
    type: boost_Post_error,
    payload: error,
  };
};

export const BoostPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(BoostPost());
    Api.axiosPost({
      body: data,
      url: Config.boostPostAPI,
    })
      .then(response => {
        dispatch(BoostPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(BoostPostError(error));
        failed?.(error);
      });
  };
};
