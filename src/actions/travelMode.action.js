import {Config} from '../config';
import {
    travel_mode,
    travel_mode_success,
    travel_mode_error
} from '../constants/common';
import Api from '../services/Api';

export const TravelMode = () => {
  return {
    type: travel_mode,
  };
};
export const TravelModeSuccess = payload => {
  return {
    type: travel_mode_success,
    payload,
  };
};
export const TravelModeError = error => {
  return {
    type: travel_mode_error,
    payload: error,
  };
};

export const TravelModeRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(TravelMode());
    Api.axiosPost({
      body: data,
      url: Config.travelModeAPI,
    })
      .then(response => {
        dispatch(TravelModeSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(TravelModeError(error));
        failed?.(error);
      });
  };
};
