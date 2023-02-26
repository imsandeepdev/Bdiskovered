import {Config} from '../config';
import {
    user_Location,
    user_Location_success,
    user_Location_error
} from '../constants/common';
import Api from '../services/Api';

export const UserLocation = () => {
  return {
    type: user_Location,
  };
};
export const UserLocationSuccess = payload => {
  return {
    type: user_Location_success,
    payload,
  };
};
export const UserLocationError = error => {
  return {
    type: user_Location_error,
    payload: error,
  };
};

export const UserLocationRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(UserLocation());
    Api.axiosPost({
      body: data,
      url: Config.userLocationAPI,
    })
      .then(response => {
        dispatch(UserLocationSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(UserLocationError(error));
        failed?.(error);
      });
  };
};
