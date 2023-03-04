import {Config} from '../config';
import {
    notification_List,
    notification_List_success,
    notification_List_error,
    notification_Delete,
    notification_Delete_success,
    notification_Delete_error
} from '../constants/common';
import Api from '../services/Api';

export const NotificationList = () => {
  return {
    type: notification_List,
  };
};
export const NotificationListSuccess = payload => {
  return {
    type: notification_List_success,
    payload,
  };
};
export const NotificationListError = error => {
  return {
    type: notification_List_error,
    payload: error,
  };
};


export const NotificationDelete = () => {
  return {
    type: notification_Delete,
  };
};
export const NotificationDeleteSuccess = payload => {
  return {
    type: notification_Delete_success,
    payload,
  };
};
export const NotificationDeleteError = error => {
  return {
    type: notification_Delete_error,
    payload: error,
  };
};

export const NotificationListRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(NotificationList());
    Api.axiosGet({
      url: Config.notificationListAPI,
    })
      .then(response => {
        dispatch(NotificationListSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(NotificationListError(error));
        failed?.(error);
      });
  };
};


export const NotificationDeleteRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(NotificationDelete());
    Api.axiosPost({
      body:data,
      url: Config.notificationDeleteAPI,
    })
      .then(response => {
        dispatch(NotificationDeleteSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(NotificationDeleteError(error));
        failed?.(error);
      });
  };
};
