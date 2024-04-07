import { types } from "../types/types";

const baseUrl = process.env.REACT_APP_API_URL;

export const httpGetUsers = async () => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/users`);

    const res = await response.json();

    dispatch(getUsers(res.users));
  };
};

const getUsers = (payload) => ({
  type: types.getUsers,
  payload,
});
