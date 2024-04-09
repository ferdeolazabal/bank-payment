// @ts-nocheck
import { types } from "../types/types";

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

    case types.filterPaymentsByAmount:
      let filterAmount;
      payload === ""
        ? (filterAmount = state.payments)
        : (filterAmount = state.payments.filter((p) => p?.amount === +payload));

      return {
        ...state,
        paymentsToFilter: filterAmount,
      };

    default:
      return state;
  }
};
