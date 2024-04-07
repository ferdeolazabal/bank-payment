// @ts-nocheck
import React, { useEffect } from "react";
import { httpGetPayments } from "../redux/actions/payments";
import { httpGetUsers } from "../redux/actions/users";
import { Navigation } from "../routes/Navigation";
import { useDispatch } from "react-redux";
import Header from "./Header";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(await httpGetUsers());
      dispatch(await httpGetPayments());
    }

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Navigation />
    </div>
  );
};

export default Layout;
