import {
  GET_CLIENTS_ERROR,
  GET_CLIENTS_PENDING,
  GET_CLIENTS_SUCCESS,
  GET_PAYMENTS_ERROR,
  GET_PAYMENTS_PENDING,
  GET_PAYMENTS_SUCCESS,
  ADD_PAYMENT_ERROR,
  ADD_PAYMENT_PENDING,
  ADD_PAYMENT_SUCCESS
} from './constants';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_CLIENTS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        isLoading: false,
        error: false
      };
    case GET_CLIENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case GET_PAYMENTS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload,
        isLoading: false,
        error: false
      };
    case GET_PAYMENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_PAYMENT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: [...state.payments, action.payload],
        isLoading: false,
        error: false
      };
    case ADD_PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default: {
      return state;
    }
  }
};