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

const initial_state = {
  loading: false,
  payPaymentInit: {},
  cardListInit: {},
  cardDeleteInit: {},
  saveCardInit: {},
  error: '',
};

const reducer = (state = initial_state, {type, payload}) => {
  switch (type) {
    case pay_Payment:
      return {
        ...state,
        loading: true,
      };
    case pay_Payment_success:
      return {
        loading: false,
        payPaymentInit: payload,
        error: '',
      };
    case pay_Payment_error:
      return {
        loading: false,
        error: payload.error,
      };

    case card_List:
      return {
        ...state,
        loading: true,
      };
    case card_List_success:
      return {
        loading: false,
        cardListInit: payload,
        error: '',
      };
    case card_List_error:
      return {
        loading: false,
        error: payload.error,
      };

    case card_Delete:
      return {
        ...state,
        loading: true,
      };
    case card_Delete_success:
      return {
        loading: false,
        cardDeleteInit: payload,
        error: '',
      };
    case card_Delete_error:
      return {
        loading: false,
        error: payload.error,
      };

    case save_Card:
      return {
        ...state,
        loading: true,
      };
    case save_Card_success:
      return {
        loading: false,
        saveCardInit: payload,
        error: '',
      };
    case save_Card_error:
      return {
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
