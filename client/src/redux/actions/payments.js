// @ts-nocheck
import { roundDateToDay } from "../../helpers/functions";
import {
  ADD_PAYMENT,
  DOWNLOAD_PAYMENTS_CSV,
  DOWNLOAD_PAYMENTS_CSV_ERROR,
  GET_PAYMENTS,
  SEARCH_USER_PAYMENTS,
  SET_FILTERED_PAYMENTS_BY_AMOUNT,
  SET_FILTERED_PAYMENTS_BY_DATE,
  SET_FILTERED_PAYMENTS_BY_RECEIVER,
  SET_FILTERED_PAYMENTS_BY_STATUS,
  SET_FILTERED_PAYMENTS_BY_TYPE,
  SET_FILTERED_PAYMENTS_BY_USERS,
} from "../types/types";

const baseUrl = process.env.REACT_APP_API_URL;

export const httpGetPayments = async () => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/payments`);

    const res = await response.json();

    dispatch(getPayments(res.payments));
  };
};

const getPayments = (payload) => ({
  type: GET_PAYMENTS,
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
            type: ADD_PAYMENT,
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

export const filterPaymentsByUser = (userId) => {
  return async (dispatch, getState) => {
    const { payments } = getState().payments;

    let filteredPayments;

    if (userId === "") {
      filteredPayments = payments;
    } else {
      filteredPayments = payments.filter((p) => p.user?.id === userId);
    }

    dispatch({
      type: SET_FILTERED_PAYMENTS_BY_USERS,
      payload: filteredPayments,
    });
  };
};
export const filterPaymentsByType = (type) => {
  return async (dispatch, getState) => {
    const { payments } = getState().payments;

    let filteredPayments;

    if (type === "") {
      filteredPayments = payments;
    } else {
      filteredPayments = payments.filter((p) => p.type === type);
    }

    dispatch({
      type: SET_FILTERED_PAYMENTS_BY_TYPE,
      payload: filteredPayments,
    });
  };
};

export const filterPaymentByStatus = (status) => {
  return async (dispatch, getState) => {
    const { payments } = getState().payments;

    let filteredPayments;

    if (status === "") {
      filteredPayments = payments;
    } else {
      filteredPayments = payments.filter((p) => p.status === status);
    }

    dispatch({
      type: SET_FILTERED_PAYMENTS_BY_STATUS,
      payload: filteredPayments,
    });
  };
};

export const filterPaymentsByAmount = (amount) => {
  return async (dispatch, getState) => {
    const { payments } = getState().payments;

    let filterAmount;

    if (amount === "") {
      filterAmount = [...payments];
    } else if (amount === "Asc" || amount === "Desc") {
      filterAmount = [...payments];
      filterAmount.sort((a, b) => {
        if (amount === "Asc") {
          return a.amount - b.amount;
        } else {
          return b.amount - a.amount;
        }
      });
    } else {
      filterAmount = payments.filter((p) => p?.amount === +amount);
    }

    dispatch({
      type: SET_FILTERED_PAYMENTS_BY_AMOUNT,
      payload: filterAmount,
    });
  };
};

export const filterPaymentsByReceiver = (email) => {
  return async (dispatch, getState) => {
    const { payments } = getState().payments;

    let filteredPayments;

    if (email === "") {
      filteredPayments = payments;
    } else {
      filteredPayments = payments.filter((p) => p.receiver === email);
    }

    dispatch({
      type: SET_FILTERED_PAYMENTS_BY_RECEIVER,
      payload: filteredPayments,
    });
  };
};

export const filterPaymentsByDate = (date) => {
  return async (dispatch, getState) => {
    const { payments } = getState().payments;

    let filterDate;
    const selectedDate =
      date !== "" && roundDateToDay(new Date(date)).toISOString().slice(0, 10);

    if (date === "") {
      filterDate = payments;
    } else {
      filterDate = payments.filter((p) => {
        const paymentDate = roundDateToDay(new Date(p.createdAt))
          .toISOString()
          .slice(0, 10);
        return paymentDate === selectedDate;
      });
    }

    dispatch({
      type: SET_FILTERED_PAYMENTS_BY_DATE,
      payload: filterDate,
    });
  };
};

export const searchUserPayments = (payload) => {
  return (dispatch, getState) => {
    const { payments } = getState();
    const userFilter = payments.payments?.filter((payment) => {
      const lowercaseName = payload.toLowerCase();

      const lowercaseReceiver = payment?.receiver?.toLowerCase();
      const lowercaseFirstName = payment?.user?.firstName?.toLowerCase();
      const lowercaseLastName = payment?.user?.lastName?.toLowerCase();
      const lowercaseEmail = payment?.user?.email?.toLowerCase();

      return (
        lowercaseReceiver?.includes(lowercaseName) ||
        lowercaseFirstName?.includes(lowercaseName) ||
        lowercaseLastName?.includes(lowercaseName) ||
        lowercaseEmail?.includes(lowercaseName)
      );
    });

    dispatch({
      type: SEARCH_USER_PAYMENTS,
      payload: userFilter,
    });
  };
};

export const exportPaymentsInCsv = () => {
  return (dispatch) => {
    const url = `${baseUrl}/payments/export-csv`;
    try {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Listado_de_pagos.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .then(() =>
          dispatch({
            type: DOWNLOAD_PAYMENTS_CSV,
            payload: true,
          })
        );
    } catch (e) {
      dispatch({
        type: DOWNLOAD_PAYMENTS_CSV_ERROR,
        payload: e,
      });
      console.log("ERROR DOWNLOADING CSV", e);
    }
  };
};
