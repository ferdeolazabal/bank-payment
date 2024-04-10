// @ts-nocheck
import { roundDateToDay } from "../../helpers/functions";
import {
  SEARCH_USER_PAYMENTS,
  SET_FILTERED_PAYMENTS_BY_AMOUNT,
  SET_FILTERED_PAYMENTS_BY_DATE,
  types,
} from "../types/types";

const initialState = {
  payments: [],
  paymentsToFilter: [],
};

export const paymentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.getPayments:
      return {
        ...state,
        payments: payload,
        paymentsToFilter: payload,
      };

    case types.postPayments:
      return {
        ...state,
        payments: [payload, ...state.payments],
        paymentsToFilter: [payload, ...state.paymentsToFilter],
      };

    case types.filterPaymentsByUsers:
      let filterPay;
      payload === ""
        ? (filterPay = state.payments)
        : (filterPay = state.payments.filter((p) => p.user._id === payload));

      return {
        ...state,
        paymentsToFilter: filterPay,
      };

    case types.filterPaymentsByType:
      let filterType;
      payload === ""
        ? (filterType = state.payments)
        : (filterType = state.payments.filter((p) => p.type === payload));

      return {
        ...state,
        paymentsToFilter: filterType,
      };

    case types.filterPaymentsByStatus:
      let fStatus;
      payload === ""
        ? (fStatus = state.payments)
        : (fStatus = state.payments.filter((p) => p.status === payload));

      return {
        ...state,
        paymentsToFilter: fStatus,
      };

    case types.filterPaymentsByReceiver:
      let fReceiver;
      payload === ""
        ? (fReceiver = state.payments)
        : (fReceiver = state.payments.filter((p) => p.receiver === payload));

      return {
        ...state,
        paymentsToFilter: fReceiver,
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
