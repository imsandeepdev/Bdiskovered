import {
  block_Post,
  block_Post_success,
  block_Post_error,
  block_User,
  block_User_success,
  block_User_error,
  report_Post,
  report_Post_success,
  report_Post_error,
  block_User_List,
  block_User_List_success,
  block_User_List_error,
  unblock_User,
  unblock_User_success,
  unblock_User_error,
} from '../constants/common';

const initial_state = {
  loading: false,
  blockPostinit: {},
  blockUserinit: {},
  reportPostinit: {},
  blockUserListinit: {},
  unblockUserinit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case block_Post:
      return {
        ...state,
        loading: true,
      };
    case block_Post_success:
      return {
        loading: false,
        blockPostinit: payload,
        error: '',
      };
    case block_Post_error:
      return {
        loading: false,
        error: payload.error,
      };

    case block_User:
      return {
        ...state,
        loading: true,
      };
    case block_User_success:
      return {
        loading: false,
        blockUserinit: payload,
        error: '',
      };
    case block_User_error:
      return {
        loading: false,
        error: payload.error,
      };

    case report_Post:
      return {
        ...state,
        loading: true,
      };
    case report_Post_success:
      return {
        loading: false,
        reportPostinit: payload,
        error: '',
      };
    case report_Post_error:
      return {
        loading: false,
        error: payload.error,
      };

    case block_User_List:
      return {
        ...state,
        loading: true,
      };
    case block_User_List_success:
      return {
        loading: false,
        blockUserListinit: payload,
        error: '',
      };
    case block_User_List_error:
      return {
        loading: false,
        error: payload.error,
      };

    case unblock_User:
      return {
        ...state,
        loading: true,
      };
    case unblock_User_success:
      return {
        loading: false,
        unblockUserinit: payload,
        error: '',
      };
    case unblock_User_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
