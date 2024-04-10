// @ts-nocheck
import {
  ADD_PAYMENT,
  GET_PAYMENTS,
  SEARCH_USER_PAYMENTS,
  SET_FILTERED_PAYMENTS_BY_AMOUNT,
  SET_FILTERED_PAYMENTS_BY_DATE,
  SET_FILTERED_PAYMENTS_BY_RECEIVER,
  SET_FILTERED_PAYMENTS_BY_STATUS,
  SET_FILTERED_PAYMENTS_BY_TYPE,
  SET_FILTERED_PAYMENTS_BY_USERS,
} from "../types/types";

const initialState = {
  payments: [],
  paymentsToFilter: [],
};

export const paymentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PAYMENTS:
      return {
        ...state,
        payments: payload,
        paymentsToFilter: payload,
      };

    case ADD_PAYMENT:
      return {
        ...state,
        payments: [payload, ...state.payments],
        paymentsToFilter: [payload, ...state.paymentsToFilter],
      };

    case SET_FILTERED_PAYMENTS_BY_USERS:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    case SET_FILTERED_PAYMENTS_BY_TYPE:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    case SET_FILTERED_PAYMENTS_BY_STATUS:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    case SET_FILTERED_PAYMENTS_BY_RECEIVER:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    case SET_FILTERED_PAYMENTS_BY_AMOUNT:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    case SET_FILTERED_PAYMENTS_BY_DATE:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    case SEARCH_USER_PAYMENTS:
      return {
        ...state,
        paymentsToFilter: payload,
      };

    default:
      return state;
  }
};
