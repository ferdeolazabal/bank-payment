import { types } from "../types/types";

const initialState = {
  payments: [],
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getPayments:
      return {
        ...state,
        payments: action.payload,
      };

    default:
      return state;
  }
};
