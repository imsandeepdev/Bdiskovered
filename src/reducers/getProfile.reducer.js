import {
    getProfile_Details,
    getProfile_Details_success,
    getProfile_Details_error,
    profile_Update,
    profile_Update_success,
    profile_Update_error,
    connectTailent_Profile,
    connectTailent_Profile_success,
    connectTailent_Profile_error
} from '../constants/common';

const initial_state = {
  loading: false,
  getProfileInit: {},
  profileUpdateInit: {},
  connectTailentProfileInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case getProfile_Details:
      return {
        ...state,
        loading: true,
      };
    case getProfile_Details_success:
      return {
        loading: false,
        getProfileInit: payload,
        error: '',
      };
    case getProfile_Details_error:
      return {
        loading: false,
        error: payload.error,
      };
    case profile_Update:
      return {
        ...state,
        loading: true,
      };
    case profile_Update_success:
      return {
        loading: false,
        profileUpdateInit: payload,
        error: '',
      };
    case profile_Update_error:
      return {
        loading: false,
        error: payload.error,
      };

    case connectTailent_Profile:
      return {
        ...state,
        loading: true,
      };
    case connectTailent_Profile_success:
      return {
        loading: false,
        connectTailentProfileInit: payload,
        error: '',
      };
    case connectTailent_Profile_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
