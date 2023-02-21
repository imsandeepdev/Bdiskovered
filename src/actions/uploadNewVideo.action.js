import {Config} from '../config';
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


export const PostDelete = () => {
  return {
    type: post_Delete,
  };
};
export const PostDeleteSuccess = payload => {
  return {
    type: post_Delete_success,
    payload,
  };
};
export const PostDeleteError = error => {
  return {
    type: post_Delete_error,
    payload: error,
  };
};

export const EditPost = () => {
  return {
    type: edit_Post,
  };
};
export const EditPostSuccess = payload => {
  return {
    type: edit_Post_success,
    payload,
  };
};
export const EditPostError = error => {
  return {
    type: edit_Post_error,
    payload: error,
  };
};

export const UploadNewVideoRequest = (
  formdata,
  dataType,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(UploadNewVideo());
    Api.VideoPostFetch({
      body: formdata,
      datatype: dataType,
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


export const PostDeleteRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(PostDelete());
    Api.MultiPostFetch({
      body: data,
      url: Config.postDeleteAPI,
    })
      .then(response => {
        dispatch(PostDeleteSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(PostDeleteError(error));
        failed?.(error);
      });
  };
};


export const EditPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(EditPost());
    Api.MultiPostFetch({
      body: data,
      url: Config.editPostAPI,
    })
      .then(response => {
        dispatch(EditPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(EditPostError(error));
        failed?.(error);
      });
  };
};

