// @ts-nocheck
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByUser } from "../../redux/actions/payments";

const PaymentsHeader = () => {
  const dispatch = useDispatch();

  const payments = useSelector(({ payments }) => payments.payments) || [];
  const users = payments.map((transaction) => transaction.user);

  const uniqueUsers = Array.from(new Set(users.map((user) => user._id))).map(
    (id) => {
      return users.find((user) => user._id === id);
    }
  );

  const handleFilterByUser = (e) => {
    e.preventDefault();
    dispatch(filterByUser(e.target.value));
  };

  return (
    <thead>
      <tr>
        <th className=" flex flex-col px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
          Nomre de usuario
          <select onChange={(e) => handleFilterByUser(e)} className="">
            <option value="">Filtrar por usuario</option>
            {uniqueUsers.map((user) => {
              return (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              );
            })}
            <option value="">Deshacer Filtro</option>
          </select>
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
          Forma de pago
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 text-center">
          Fecha
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 text-center">
          Estado
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
          Monto
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
          Destinatario
        </th>
      </tr>
    </thead>
  );
};

export default PaymentsHeader;
