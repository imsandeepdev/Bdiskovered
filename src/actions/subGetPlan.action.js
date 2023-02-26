import {Config} from '../config';
import {
  subscriber_GetPlans,
  subscriber_GetPlans_success,
  subscriber_GetPlans_error,
  getCustom_Plan,
  getCustom_Plan_success,
  getCustom_Plan_error,
  getSubscriber_Get,
  getSubscriber_Get_success,
  getSubscriber_Get_error
} from '../constants/common';
import Api from '../services/Api';

export const SubscriberGetPlan = () => {
  return {
    type: subscriber_GetPlans,
  };
};
export const SubscriberGetPlanSuccess = payload => {
  return {
    type: subscriber_GetPlans_success,
    payload,
  };
};
export const SubscriberGetPlanError = error => {
  return {
    type: subscriber_GetPlans_error,
    payload: error,
  };
};

export const GetCustomPlan = () => {
  return {
    type: getCustom_Plan,
  };
};
export const GetCustomPlanSuccess = payload => {
  return {
    type: getCustom_Plan_success,
    payload,
  };
};
export const GetCustomPlanError = error => {
  return {
    type: getCustom_Plan_error,
    payload: error,
  };
};

export const GetSubscriberGet = () => {
  return {
    type: getSubscriber_Get,
  };
};
export const GetSubscriberGetSuccess = payload => {
  return {
    type: getSubscriber_Get_success,
    payload,
  };
};
export const GetSubscriberGetError = error => {
  return {
    type: getSubscriber_Get_error,
    payload: error,
  };
};

export const SubscriberGetPlanRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SubscriberGetPlan());
    Api.axiosPost({
      url: Config.subscriberGetPlansAPI,
    })
      .then(response => {
        dispatch(SubscriberGetPlanSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(SubscriberGetPlanError(error));
        failed?.(error);
      });
  };
};

export const GetCustomPlanRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(GetCustomPlan());
    Api.axiosPost({
      url: Config.subGetCustomPlanAPI,
    })
      .then(response => {
        dispatch(GetCustomPlanSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(GetCustomPlanError(error));
        failed?.(error);
      });
  };
};


export const GetSubscruberGetRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(GetSubscriberGet());
    Api.axiosPost({
      url: Config.getsubscriberGetAPI,
    })
      .then(response => {
        dispatch(GetSubscriberGetSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(GetSubscriberGetError(error));
        failed?.(error);
      });
  };
};
