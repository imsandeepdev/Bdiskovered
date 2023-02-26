import {Config} from '../config';
import {
  connect_Request,
  connect_Request_success,
  connect_Request_error
} from '../constants/common';
import Api from '../services/Api';

export const ConnectRequest = () => {
  return {
    type: connect_Request,
  };
};
export const ConnectRequestSuccess = payload => {
  return {
    type: connect_Request_success,
    payload,
  };
};
export const ConnectRequestError = error => {
  return {
    type: connect_Request_error,
    payload: error,
  };
};

export const ConnectRequestRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ConnectRequest());
    Api.axiosPost({
      body: data,
      url: Config.connectRequestAPI,
    })
      .then(response => {
        dispatch(ConnectRequestSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(ConnectRequestError(error));
        failed?.(error);
      });
  };
};
