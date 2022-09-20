import {Config} from '../config';
import {
  showAll_Post,
  showAll_Post_success,
  showAll_Post_error
} from '../constants/common';
import Api from '../services/Api';

export const ShowAllPost = () => {
  return {
    type: showAll_Post,
  };
};
export const ShowAllPostSuccess = payload => {
  return {
    type: showAll_Post_success,
    payload,
  };
};
export const ShowAllPostError = error => {
  return {
    type: showAll_Post_error,
    payload: error,
  };
};



export const ShowAllPostRequest = (
  
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ShowAllPost());
    Api.MultiPostFetch({
      url: Config.showAllPostAPI,
    })
      .then(response => {
        dispatch(ShowAllPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(ShowAllPostError(error));
        failed?.(error);
      });
  };
};


