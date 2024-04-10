// @ts-ignore
import { fetchSinToken } from "../../helpers/fetch";
import { LOGIN, LOGOUT } from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", `${new Date().getTime()}`);

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          user: body.user,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const refreshAuthToken = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No se encontró el token en el almacenamiento local");
        return;
      }

      const resp = await fetch("auth/renew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
      });

      const body = await resp.json();
      console.log("body", body);
      if (body.ok) {
        localStorage.setItem("token", body.token);
        // @ts-ignore
        localStorage.setItem("token-init-date", new Date().getTime());
      } else {
        console.error("Error al actualizar el token:", body.msg);
      }
    } catch (e) {
      console.error(
        "Error al realizar la solicitud de actualización del token:",
        { e }
      );
    }
  };
};

export const startRegister = (email, password, firstName, lastName) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/newUser",
      { email, password, firstName, lastName },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      // @ts-ignore
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          user: body.user,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: LOGOUT });
