import { types } from "../types/types";

const initialState = {
  uid: null,
  name: null,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
      };
    case types.authLogout:
      console.log("lalal");
      return {
        uid: null,
        name: null,
        user: {},
      };
    default:
      return state;
  }
};
