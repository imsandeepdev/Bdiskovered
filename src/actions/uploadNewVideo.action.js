import {Config} from '../config';
import {
    upload_NewVideo,
    upload_NewVideo_success,
    upload_NewVideo_error
} from '../constants/common';
import Api from '../services/Api';

export const UploadNewVideo = () => {
  return {
    type: upload_NewVideo,
  };
};
export const UploadNewVideoSuccess = payload => {
  return {
    type: upload_NewVideo_success,
    payload,
  };
};
export const UploadNewVideoError = error => {
  return {
    type: upload_NewVideo_error,
    payload: error,
  };
};

export const UploadNewVideoRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(UploadNewVideo());
    Api.MultiPostFetch({
      body: data,
      url: Config.uploadNewVideoAPI,
    })
      .then(response => {
        dispatch(UploadNewVideoSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(UploadNewVideoError(error));
        failed?.(error);
      });
  };
};
