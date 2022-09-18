import {Config} from '../config';
import {
  get_Tailent,
  get_Tailent_success,
  get_Tailent_error
} from '../constants/common';
import Api from '../services/Api';

export const GetTailent = () => {
  return {
    type: get_Tailent,
  };
};
export const GetTailentSuccess = payload => {
  return {
    type: get_Tailent_success,
    payload,
  };
};
export const GetTailentError = error => {
  return {
    type: get_Tailent_error,
    payload: error,
  };
};

export const GetTailentRequest = (
  
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(GetTailent());
    Api.getRequest({
      
      url: Config.getTailentAPI,
    })
      .then(response => {
        dispatch(GetTailentSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(GetTailentError(error));
        failed?.(error);
      });
  };
};
