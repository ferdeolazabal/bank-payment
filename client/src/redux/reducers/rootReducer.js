import { combineReducers } from "redux";
import { paymentsReducer } from "./paymerntsReducer";
import { usersReducer } from "./usersReducers";

export const rootReducer = combineReducers({
  users: usersReducer,
  payments: paymentsReducer,
});
