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

export const FetchClients = async (token, dispatch) => {
  try {
    await dispatch({ type: GET_CLIENTS_PENDING });
    const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/clients/bySeller`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const res = await response.json();
    if (res.error) {
      throw res
    }
    await dispatch({ type: GET_CLIENTS_SUCCESS, payload: res.data });
    return res.data
  } catch (error) {
    await dispatch({ type: GET_CLIENTS_ERROR });
    console.error(error.message)
    return error
  }
};

export const FetchPayments = async (token, dispatch) => {
  try {
    await dispatch({ type: GET_PAYMENTS_PENDING });
    const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/payments/bySeller`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const res = await response.json();
    if (res.error) {
      throw res
    }
    await dispatch({ type: GET_PAYMENTS_SUCCESS, payload: res.data.slice(0, 10) });
    return res.data.slice(0, 10)
  } catch (error) {
    await dispatch({ type: GET_PAYMENTS_ERROR });
    console.error(error.message)
    return error
  }
};