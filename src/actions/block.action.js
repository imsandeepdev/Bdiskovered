import {Config} from '../config';
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
  unblock_User_error
} from '../constants/common';
import Api from '../services/Api';

export const BlockPost = () => {
  return {
    type: block_Post,
  };
};
export const BlockPostSuccess = payload => {
  return {
    type: block_Post_success,
    payload,
  };
};
export const BlockPostError = error => {
  return {
    type: block_Post_error,
    payload: error,
  };
};

export const BlockUser = () => {
  return {
    type: block_User,
  };
};
export const BlockUserSuccess = payload => {
  return {
    type: block_User_success,
    payload,
  };
};
export const BlockUserError = error => {
  return {
    type: block_User_error,
    payload: error,
  };
};

export const ReportPost = () => {
  return {
    type: report_Post,
  };
};
export const ReportPostSuccess = payload => {
  return {
    type: report_Post_success,
    payload,
  };
};
export const ReportPostError = error => {
  return {
    type: report_Post_error,
    payload: error,
  };
};

export const BlockUserList = () => {
  return {
    type: block_User_List,
  };
};
export const BlockUserListSuccess = payload => {
  return {
    type: block_User_List_success,
    payload,
  };
};
export const BlockUserListError = error => {
  return {
    type: block_User_List_error,
    payload: error,
  };
};

export const UnblockUser = () => {
  return {
    type: unblock_User,
  };
};
export const UnblockUserSuccess = payload => {
  return {
    type: unblock_User_success,
    payload,
  };
};
export const UnblockUserError = error => {
  return {
    type: unblock_User_error,
    payload: error,
  };
};

export const BlockPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(BlockPost());
    Api.axiosPost({
      body: data,
      url: Config.blockPostAPI,
    })
      .then(response => {
        dispatch(BlockPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(BlockPostError(error));
        failed?.(error);
      });
  };
};

export const BlockUserRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(BlockUser());
    Api.axiosPost({
      body: data,
      url: Config.blockUserAPI,
    })
      .then(response => {
        dispatch(BlockUserSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(BlockUserError(error));
        failed?.(error);
      });
  };
};

export const ReportPostRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(ReportPost());
    Api.axiosPost({
      body: data,
      url: Config.reportPostAPI,
    })
      .then(response => {
        dispatch(ReportPostSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(ReportPostError(error));
        failed?.(error);
      });
  };
};

export const BlockUserListRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(BlockUserList());
    Api.axiosPost({
      url: Config.blockUserListAPI,
    })
      .then(response => {
        dispatch(BlockUserListSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(BlockUserListError(error));
        failed?.(error);
      });
  };
};

export const UnblockUserRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(UnblockUser());
    Api.axiosPost({
      body: data,
      url: Config.unblockUserAPI,
    })
      .then(response => {
        dispatch(UnblockUserSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(UnblockUserError(error));
        failed?.(error);
      });
  };
};
