import {Config} from '../config';
import {
  bottom_tab,
  bottom_tab_success,
  bottom_tab_error
} from '../constants/common';
import Api from '../services/Api';

export const BottomTab = () => {
  return {
    type: bottom_tab,
  };
};
export const BottomTabSuccess = payload => {
  return {
    type: bottom_tab_success,
    payload,
  };
};
export const BottomTabError = error => {
  return {
    type: bottom_tab_error,
    payload: error,
  };
};

export const BottomTabRequest = (
  data
) => {
  return dispatch => {
    dispatch(BottomTabSuccess(data))
  };
};
