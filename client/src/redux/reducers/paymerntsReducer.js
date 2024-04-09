// @ts-nocheck
import { types } from "../types/types";

const initialState = {
  payments: [],
  paymentsToFilter: [],
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getPayments:
      return {
        ...state,
        payments: action.payload,
        paymentsToFilter: action.payload,
      };

    case types.postPayments:
      return {
        ...state,
        payments: [action.payload, ...state.payments],
        paymentsToFilter: [action.payload, ...state.paymentsToFilter],
      };

    case types.filterPaymentsByUsers:
      let filteredPayments;
      action.payload === ""
        ? (filteredPayments = state.payments)
        : (filteredPayments = state.payments.filter(
            (payment) => payment.user._id === action.payload
          ));

      return {
        ...state,
        paymentsToFilter: filteredPayments,
      };

    default:
      return state;
  }
};
