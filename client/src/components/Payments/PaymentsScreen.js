// @ts-nocheck
import React from "react";
import PaymentsRow from "./PaymentsRow";
import PaymentsHeader from "./PaymentsHeader";
import { useSelector } from "react-redux";

const PaymentsScreen = () => {
  const payments = useSelector(({ payments }) => payments.payments);

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="flex flex-col mt-8">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <PaymentsHeader />

              <tbody className="bg-white">
                {payments.length > 0 &&
                  payments.map((payment) => (
                    <PaymentsRow key={payment._id} payment={payment} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsScreen;
