// @ts-ignore
import { fetchSinToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
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

export const startRegister = (email, password, firstName, lastName) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/newUser",
      { email, password, firstName, lastName },
      "POST"
    );
    const body = await resp.json();
    console.log("body", body);
    if (body.ok) {
      localStorage.setItem("token", body.token);
      // @ts-ignore
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ user: body.user }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });