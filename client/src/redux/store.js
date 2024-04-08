import { configureStore } from "@reduxjs/toolkit";

import { usersReducer } from "./reducers/usersReducers";
import { paymentsReducer } from "./reducers/paymerntsReducer";

export const store = configureStore({
  reducer: { users: usersReducer, payments: paymentsReducer },
});
