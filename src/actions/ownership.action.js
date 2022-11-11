import {Config} from '../config';
import {
    change_Ownership,
    change_Ownership_success,
    change_Ownership_error
} from '../constants/common';
import Api from '../services/Api';

export const ChangeOwnerShip = () => {
  return {
    type: change_Ownership,
  };
};
export const ChangeOwnerShipSuccess = payload => {
  return {
    type: change_Ownership_success,
    payload,
  };
};
export const ChangeOwnerShipError = error => {
  return {
    type: change_Ownership_error,
    payload: error,
  };
};

export const ChangeOwnerShipRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ChangeOwnerShip());
    Api.MultiPostFetch({
      url: Config.changeOwnershipAPI,
    })
      .then(response => {
        dispatch(ChangeOwnerShipSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(ChangeOwnerShipError(error));
        failed?.(error);
      });
  };
};
