import {Config} from '../config';
import {
    tailent_ProfileCreate,
    tailent_ProfileCreate_success,
    tailent_ProfileCreate_error,
    userSelectionFinish,
    userSelectionFinish_success,
    userSelectionFinish_error
} from '../constants/common';
import Api from '../services/Api';

export const TailentProfileCreate = () => {
  return {
    type: tailent_ProfileCreate,
  };
};
export const TailentProfileCreateSuccess = payload => {
  return {
    type: tailent_ProfileCreate_success,
    payload,
  };
};
export const TailentProfileCreateError = error => {
  return {
    type: tailent_ProfileCreate_error,
    payload: error,
  };
};

export const UserSelectionFinish = () => {
  return {
    type: userSelectionFinish,
  };
};
export const UserSelectionFinishSuccess = payload => {
  return {
    type: userSelectionFinish_success,
    payload,
  };
};
export const UserSelectionFinishError = error => {
  return {
    type: userSelectionFinish_error,
    payload: error,
  };
};

export const TailentProfileCreateRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(TailentProfileCreate());
    Api.axiosPost({
      body: data,
      url: Config.tailentProfileCreateAPI,
    })
      .then(response => {
        dispatch(TailentProfileCreateSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(TailentProfileCreateError(error));
        failed?.(error);
      });
  };
};


export const UserSelectionFinishRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(UserSelectionFinish());
    Api.axiosPost({
      body: data,
      url: Config.userSelectionFinishAPI,
    })
      .then(response => {
        dispatch(UserSelectionFinishSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(UserSelectionFinishError(error));
        failed?.(error);
      });
  };
};
