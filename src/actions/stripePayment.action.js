import {Config} from '../config';
import {
  pay_Payment,
  pay_Payment_success,
  pay_Payment_error,
  card_List,
  card_List_success,
  card_List_error,
  card_Delete,
  card_Delete_success,
  card_Delete_error,
  save_Card,
  save_Card_success,
  save_Card_error
} from '../constants/common';
import Api from '../services/Api';

export const PayPayment = () => {
  return {
    type: pay_Payment,
  };
};
export const PayPaymentSuccess = payload => {
  return {
    type: pay_Payment_success,
    payload,
  };
};
export const PayPaymentError = error => {
  return {
    type: pay_Payment_error,
    payload: error,
  };
};


export const CardList = () => {
  return {
    type: card_List,
  };
};
export const CardListSuccess = payload => {
  return {
    type: card_List_success,
    payload,
  };
};
export const CardListError = error => {
  return {
    type: card_List_error,
    payload: error,
  };
};

export const CardDelete = () => {
  return {
    type: card_Delete,
  };
};
export const CardDeleteSuccess = payload => {
  return {
    type: card_Delete_success,
    payload,
  };
};
export const CardDeleteError = error => {
  return {
    type: card_Delete_error,
    payload: error,
  };
};

export const SaveCard = () => {
  return {
    type: save_Card,
  };
};
export const SaveCardSuccess = payload => {
  return {
    type: save_Card_success,
    payload,
  };
};
export const SaveCardError = error => {
  return {
    type: save_Card_error,
    payload: error,
  };
};

export const PayPaymentRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(PayPayment());
    Api.MultiPostFetch({
      body: data,
      url: Config.stripePaymentAPI,
    })
      .then(response => {
        dispatch(PayPaymentSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(PayPaymentError(error));
        failed?.(error);
      });
  };
};


export const CardListRequest = (
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(CardList());
    Api.MultiPostFetch({
      url: Config.stripePaymentCardListAPI,
    })
      .then(response => {
        dispatch(CardListSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(CardListError(error));
        failed?.(error);
      });
  };
};

export const CardDeleteRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(CardDelete());
    Api.MultiPostFetch({
      body: data,
      url: Config.stripePaymentDeleteCardAPI,
    })
      .then(response => {
        dispatch(CardDeleteSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(CardDeleteError(error));
        failed?.(error);
      });
  };
};


export const SaveCardRequest = (
  data,
  success?: () => void,
  failed?: () => void,
) => {
  return dispatch => {
    dispatch(SaveCard());
    Api.MultiPostFetch({
      body: data,
      url: Config.stripePaymentSaveCardAPI,
    })
      .then(response => {
        dispatch(SaveCardSuccess(response));
        success?.(response);
      })
      .catch(error => {
        dispatch(SaveCardError(error));
        failed?.(error);
      });
  };
};
