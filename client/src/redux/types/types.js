export const types = {
  authLogin: "[auth] Start Login",
  authLogout: "[auth] Start Logout",
  authNewUserLogin: "[auth] Start New User Login",

  getUsers: "[user] Get Users",

  getPayments: "[payments] Get Payments",
  postPayments: "[payments] Post Payments",

  filterPaymentsByUsers: "[payments] Filter By Users",
  filterPaymentsByType: "[payments] Filter By Type",
  filterPaymentsByStatus: "[payments] Filter By Status",
  filterPaymentsByReceiver: "[payments] Filter By Receiver",
};
export const SET_FILTERED_PAYMENTS_BY_RECEIVER =
  "SET_FILTERED_PAYMENTS_BY_RECEIVER";
export const SET_FILTERED_PAYMENTS_BY_AMOUNT =
  "SET_FILTERED_PAYMENTS_BY_AMOUNT";
export const SET_FILTERED_PAYMENTS_BY_DATE = "SET_FILTERED_PAYMENTS_BY_DATE";
export const SEARCH_USER_PAYMENTS = "SEARCH USER PAYMENTS";
