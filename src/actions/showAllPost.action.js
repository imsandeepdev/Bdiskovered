import {Config} from '../config';
import {
  showAll_Post,
  showAll_Post_success,
  showAll_Post_error,
  playParticularVideo,
  playParticularVideo_success,
  playParticularVideo_error
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

export const PlayParticularVideo = () => {
  return {
    type: playParticularVideo,
  };
};
export const PlayParticularVideoSuccess = payload => {
  return {
    type: playParticularVideo_success,
    payload,
  };
};
export const PlayParticularVideoError = error => {
  return {
    type: playParticularVideo_error,
    payload: error,
  };
};



export const ShowAllPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ShowAllPost());
    Api.OnlyShowAllPostFetch({
      body:data,
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


export const PlayParticularVideoRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(PlayParticularVideo());
    Api.MultiPostFetch({
      body:data,
      url: Config.showAllPostAPI,
    })
      .then(response => {
        dispatch(PlayParticularVideoSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(PlayParticularVideoError(error));
        failed?.(error);
      });
  };
};


