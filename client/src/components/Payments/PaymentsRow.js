import React from "react";
import { statusEnum, typeEnum } from "../../helpers/enums";
import { emptyImage } from "../../helpers/fetch";

const PaymentsRow = ({ payment }) => {
  const { amount, status, type, user, receiver } = payment;
  const { firstName, lastName, email } = user;
  const translatedType = typeEnum[type];
  const translatedStatus = statusEnum[status];

  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img className="w-10 h-10 rounded-full" src={emptyImage} alt="" />
          </div>

          <div className="ml-4">
            <div className="text-sm font-medium leading-5 text-gray-900">
              {firstName}&nbsp;{lastName}
            </div>
            <div className="text-sm leading-5 text-gray-500">{email}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{translatedType}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          {translatedStatus}
        </span>
      </td>

      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
        $ {amount}
      </td>

      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
        {receiver}
      </td>
    </tr>
  );
};

export default PaymentsRow;
