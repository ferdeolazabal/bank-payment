// @ts-nocheck
import { roundDateToDay } from "../../helpers/functions";
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

    case types.filterPaymentsByReceiver:
      let fReceiver;
      payload === ""
        ? (fReceiver = state.payments)
        : (fReceiver = state.payments.filter((p) => p.receiver === payload));

      return {
        ...state,
        paymentsToFilter: fReceiver,
      };

    case types.filterPaymentsByAmount:
      let filterAmount;

      if (payload === "") {
        filterAmount = [...state.payments];
      } else if (payload === "Asc" || payload === "Desc") {
        filterAmount = [...state.payments];
        filterAmount.sort((a, b) => {
          if (payload === "Asc") {
            return a.amount - b.amount;
          } else {
            return b.amount - a.amount;
          }
        });
      } else {
        filterAmount = state.payments.filter((p) => p?.amount === +payload);
      }

      return {
        ...state,
        paymentsToFilter: filterAmount,
      };

    case types.filterPaymentsByDate:
      let filterDate;
      const selectedDate =
        payload !== "" &&
        roundDateToDay(new Date(payload)).toISOString().slice(0, 10);

      payload === ""
        ? (filterDate = state.payments)
        : (filterDate = state.payments.filter((p) => {
            const paymentDate = roundDateToDay(new Date(p.createdAt))
              .toISOString()
              .slice(0, 10);
            return paymentDate === selectedDate;
          }));

      return {
        ...state,
        paymentsToFilter: filterDate,
      };

    default:
      return state;
  }
};
