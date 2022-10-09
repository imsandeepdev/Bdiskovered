import {Config} from '../config';
import {
    connected_Users,
    connected_Users_success,
    connected_Users_error
} from '../constants/common';
import Api from '../services/Api';

export const ConnectedUsers = () => {
  return {
    type: connected_Users,
  };
};
export const ConnectedUsersSuccess = payload => {
  return {
    type: connected_Users_success,
    payload,
  };
};
export const ConnectedUsersError = error => {
  return {
    type: connected_Users_error,
    payload: error,
  };
};

export const ConnectedUsersRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ConnectedUsers());
    Api.MultiPostFetch({
      url: Config.connectedUsersAPI,
    })
      .then(response => {
        dispatch(ConnectedUsersSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(ConnectedUsersError(error));
        failed?.(error);
      });
  };
};
