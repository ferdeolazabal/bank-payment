// @ts-nocheck
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { statusEnum, typeEnum } from "../../helpers/enums";
import { roundDateToDay } from "../../helpers/functions";
import {
  filterPaymentsByDate,
  filterByPaymentStatus,
  filterByPaymentType,
  filterByUser,
  filterPaymentsByAmount,
  filterPaymentsByReceiver,
} from "../../redux/actions/payments";

const thStyle =
  "px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50";

const PaymentsHeader = () => {
  const dispatch = useDispatch();

  const payments = useSelector(({ payments }) => payments.payments) || [];

  const users = payments.map((transaction) => transaction.user) || [];
  const totalAmounts = payments.map((transaction) => transaction.amount) || [];
  const totalReceiver = payments.map((elem) => elem.receiver) || [];

  const totalCreatedAt =
    payments.map((elem) => {
      const roundedDate = roundDateToDay(new Date(elem.createdAt));
      return roundedDate.toISOString().slice(0, 10);
    }) || [];

  const uniqueUsers = Array.from(new Set(users?.map((user) => user?._id)))?.map(
    (id) => users?.find((user) => user?._id && user?._id === id)
  );

  const uniqueAmounts = totalAmounts?.filter(
    (amount, index) => totalAmounts?.indexOf(amount) === index
  );

  const uniqueReceivers = totalReceiver.filter(
    (receiver, index) => totalReceiver.indexOf(receiver) === index
  );

  const uniqueCreatedAt = totalCreatedAt.filter(
    (date, index) => totalCreatedAt.indexOf(date) === index
  );

  const paymentTypeOptions = Object.entries(typeEnum);
  const paymentStatusOptions = Object.entries(statusEnum);

  const handleFilterByUser = (e) => {
    e.preventDefault();
    dispatch(filterByUser(e.target.value));
  };

  const handleFilterByPaymentType = (e) => {
    e.preventDefault();
    dispatch(filterByPaymentType(e.target.value));
  };

  const handleFilterByPaymentStatus = (e) => {
    e.preventDefault();
    dispatch(filterByPaymentStatus(e.target.value));
  };

  const handleFilterByPaymentAmount = (e) => {
    e.preventDefault();
    dispatch(filterPaymentsByAmount(e.target.value));
  };

  const handleFilterByPaymentReceiver = (e) => {
    e.preventDefault();
    dispatch(filterPaymentsByReceiver(e.target.value));
  };

  const handleFilterByDate = (e) => {
    e.preventDefault();
    dispatch(filterPaymentsByDate(e.target.value));
  };

  return (
    <thead>
      <tr>
        <th className={thStyle}>
          Nombre de usuario
          <select
            onChange={(e) => handleFilterByUser(e)}
            className="flex flex-col border-gray-200 bg-gray-50 text-gray-500"
          >
            <option value="">Filtrar por usuario</option>
            {uniqueUsers?.map((user) => {
              return (
                <option
                  key={user?._id}
                  value={user?._id}
                  className="border-gray-200 bg-gray-50 text-gray-500"
                >
                  {user && (user?.firstName || "")}&nbsp;
                  {user && (user?.lastName || "")}
                </option>
              );
            })}
          </select>
        </th>

        <th className={thStyle}>
          Forma de pago
          <select
            onChange={(e) => handleFilterByPaymentType(e)}
            className="flex flex-col border-gray-200 bg-gray-50 text-gray-500"
          >
            <option value="">Filtrar por forma de pago</option>
            {paymentTypeOptions.map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </th>

        <th className={thStyle}>
          Fecha
          <select
            onChange={(e) => handleFilterByDate(e)}
            className="flex flex-col border-gray-200 bg-gray-50 text-gray-500"
          >
            <option value="">Filtrar por fecha</option>
            {uniqueCreatedAt.map((value) => (
              <option
                key={value}
                value={new Date(value)}
                className="border-gray-200 bg-gray-50 text-gray-500"
              >
                {new Date(value).toDateString()}
              </option>
            ))}
          </select>
        </th>

        <th className={thStyle}>
          Estado
          <select
            onChange={(e) => handleFilterByPaymentStatus(e)}
            className="flex flex-col border-gray-200 bg-gray-50 text-gray-500"
          >
            <option
              value=""
              className="border-gray-200 bg-gray-50 text-gray-500"
            >
              Filtrar por Estado
            </option>
            {paymentStatusOptions?.map(([key, value]) => (
              <option
                key={key}
                value={key}
                className="border-gray-200 bg-gray-50 text-gray-500"
              >
                {value}
              </option>
            ))}
          </select>
        </th>

        <th className={thStyle}>
          Monto
          <select
            onChange={(e) => handleFilterByPaymentAmount(e)}
            className="flex flex-col border-gray-200 bg-gray-50 text-gray-500"
          >
            <option
              value=""
              className="border-gray-200 bg-gray-50 text-gray-500"
            >
              Filtrar por Monto
            </option>
            <option
              value="Asc"
              className="border-gray-200 bg-gray-50 text-gray-500"
            >
              Orden Ascendente
            </option>
            <option
              value="Desc"
              className="border-gray-200 bg-gray-50 text-gray-500"
            >
              Orden Descendente
            </option>
            {uniqueAmounts.map((value) => (
              <option
                key={value}
                value={value}
                className="border-gray-200 bg-gray-50 text-gray-500"
              >
                {value}
              </option>
            ))}
          </select>
        </th>

        <th className={thStyle}>
          Destinatario
          <select
            onChange={(e) => handleFilterByPaymentReceiver(e)}
            className="flex flex-col border-gray-200 bg-gray-50 text-gray-500"
          >
            <option
              value=""
              className="border-gray-200 bg-gray-50 text-gray-500"
            >
              Filtrar por Destino
            </option>
            {uniqueReceivers.map((value) => (
              <option
                key={value}
                value={value}
                className="border-gray-200 bg-gray-50 text-gray-500"
              >
                {value}
              </option>
            ))}
          </select>
        </th>
      </tr>
    </thead>
  );
};

export default PaymentsHeader;
