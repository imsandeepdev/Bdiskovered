import {
    subscriber_GetPlans,
    subscriber_GetPlans_success,
    subscriber_GetPlans_error,
    getCustom_Plan,
    getCustom_Plan_success,
    getCustom_Plan_error
} from '../constants/common';

const initial_state = {
  loading: false,
  subGetPlanInit: {},
  getCustomPlanInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case subscriber_GetPlans:
      return {
        ...state,
        loading: true,
      };
    case subscriber_GetPlans_success:
      return {
        loading: false,
        subGetPlanInit: payload,
        error: '',
      };
    case subscriber_GetPlans_error:
      return {
        loading: false,
        error: payload.error,
      };
    case getCustom_Plan:
      return {
        ...state,
        loading: true,
      };
    case getCustom_Plan_success:
      return {
        loading: false,
        getCustomPlanInit: payload,
        error: '',
      };
    case getCustom_Plan_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
