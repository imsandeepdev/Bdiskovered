import {
    showAll_Post,
    showAll_Post_success,
    showAll_Post_error,
    playParticularVideo,
    playParticularVideo_success,
    playParticularVideo_error
} from '../constants/common';

const initial_state = {
  loading: false,
  showAllPostInit: {},
  playPartiInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case showAll_Post:
      return {
        ...state,
        loading: true,
      };
    case showAll_Post_success:
      return {
        loading: false,
        showAllPostInit: payload,
        error: '',
      };
    case showAll_Post_error:
      return {
        loading: false,
        error: payload.error,
      };
    case playParticularVideo:
      return {
        ...state,
        loading: true,
      };
    case playParticularVideo_success:
      return {
        loading: false,
        showAllPostInit: payload,
        error: '',
      };
    case playParticularVideo_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
