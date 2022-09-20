import {Config} from '../config';
import {
  getProfile_Details,
  getProfile_Details_success,
  getProfile_Details_error,
  profile_Update,
  profile_Update_success,
  profile_Update_error
} from '../constants/common';
import Api from '../services/Api';

export const GetProfileDetails = () => {
  return {
    type: getProfile_Details,
  };
};
export const GetProfileDetailsSuccess = payload => {
  return {
    type: getProfile_Details_success,
    payload,
  };
};
export const GetProfileDetailsError = error => {
  return {
    type: getProfile_Details_error,
    payload: error,
  };
};

export const ProfileUpdate = () => {
  return {
    type: profile_Update,
  };
};
export const ProfileUpdateSuccess = payload => {
  return {
    type: profile_Update_success,
    payload,
  };
};
export const ProfileUpdateError = error => {
  return {
    type: profile_Update_error,
    payload: error,
  };
};

export const GetProfileDetailsRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(GetProfileDetails());
    Api.MultiGetRequest({
      url: Config.getProfileAPI,
    })
      .then(response => {
        dispatch(GetProfileDetailsSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(GetProfileDetailsError(error));
        failed?.(error);
      });
  };
};

export const ProfileUpdateRequest = (
  data,
  dataType,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ProfileUpdate());
    Api.MultiPostFetch({
      body:data,
      datatype: dataType,
      url: Config.profileUpdateAPI,
    })
      .then(response => {
        dispatch(ProfileUpdateSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(ProfileUpdateError(error));
        failed?.(error);
      });
  };
};
