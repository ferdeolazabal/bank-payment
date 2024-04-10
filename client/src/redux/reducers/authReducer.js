import { LOGIN, LOGOUT } from "../types/types";

const initialState = {
  uid: null,
  name: null,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {
        uid: null,
        name: null,
        user: {},
      };
    default:
      return state;
  }
};
