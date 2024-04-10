// @ts-nocheck
import React, { useEffect } from "react";
import { httpGetPayments } from "../redux/actions/payments";
import { httpGetUsers } from "../redux/actions/users";
import { useDispatch } from "react-redux";

import Navigation from "../routes/Navigation";

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
    <div className="">
      <Navigation />
    </div>
  );
};

export default Layout;
