// @ts-nocheck
import { types } from "../types/types";

const baseUrl = process.env.REACT_APP_API_URL;

export const httpGetPayments = async () => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/payments`);

    const res = await response.json();

    dispatch(getPayments(res.payments));
  };
};

const getPayments = (payload) => ({
  type: types.getPayments,
  payload,
});

export const httpPostPayment = (body) => async (dispatch) => {
  try {
    const url = `${baseUrl}/payments/new`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(({ payment, ok }) => {
        if (ok) {
          dispatch({
            type: types.postPayments,
            payload: payment,
          });
          return Promise.resolve(payment);
        }
      })
      .catch((e) => {
        console.log({ e });
        return Promise.reject();
      });
  } catch (e) {
    console.log({ e });
    return Promise.reject();
  }
};

export const filterByUser = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: types.filterPaymentsByUsers,
      payload: userId,
    });
  };
};

export const filterByPaymentType = (type) => {
  return async (dispatch) => {
    dispatch({
      type: types.filterPaymentsByType,
      payload: type,
    });
  };
};
export const filterByPaymentStatus = (status) => {
  return async (dispatch) => {
    dispatch({
      type: types.filterPaymentsByStatus,
      payload: status,
    });
  };
};
