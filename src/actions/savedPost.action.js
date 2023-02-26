import {Config} from '../config';
import {
  saved_Post,
  saved_Post_success,
  saved_Post_error,
  saved_Post_List,
  saved_Post_List_success,
  saved_Post_List_error,
  delete_Saved_Post,
  delete_Saved_Post_success,
  delete_Saved_Post_error
} from '../constants/common';
import Api from '../services/Api';

export const SavedPost = () => {
  return {
    type: saved_Post,
  };
};
export const SavedPostSuccess = payload => {
  return {
    type: saved_Post_success,
    payload,
  };
};
export const SavedPostError = error => {
  return {
    type: saved_Post_error,
    payload: error,
  };
};

export const SavedPostList = () => {
  return {
    type: saved_Post_List,
  };
};
export const SavedPostListSuccess = payload => {
  return {
    type: saved_Post_List_success,
    payload,
  };
};
export const SavedPostListError = error => {
  return {
    type: saved_Post_List_error,
    payload: error,
  };
};

export const DeleteSavedPost = () => {
  return {
    type: delete_Saved_Post,
  };
};
export const DeleteSavedPostSuccess = payload => {
  return {
    type: delete_Saved_Post_success,
    payload,
  };
};
export const DeleteSavedPostError = error => {
  return {
    type: delete_Saved_Post_error,
    payload: error,
  };
};

export const SavedPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SavedPost());
    Api.axiosPost({
      body: data,
      url: Config.savedPostAPI,
    })
      .then(response => {
        dispatch(SavedPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(SavedPostError(error));
        failed?.(error);
      });
  };
};

export const SavedPostListRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SavedPostList());
    Api.axiosPost({
      url: Config.savedPostListAPI,
    })
      .then(response => {
        dispatch(SavedPostListSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(SavedPostListError(error));
        failed?.(error);
      });
  };
};

export const DeleteSavedPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(DeleteSavedPost());
    Api.axiosPost({
      body: data,
      url: Config.deleteSavedPostAPI,
    })
      .then(response => {
        dispatch(DeleteSavedPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(DeleteSavedPostError(error));
        failed?.(error);
      });
  };
};