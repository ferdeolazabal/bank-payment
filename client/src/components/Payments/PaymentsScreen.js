// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import PaymentModal from "../UiElements/PaymentModal";
import PaymentsHeader from "./PaymentsHeader";
import PaymentsRow from "./PaymentsRow";
import PaymentsSearch from "./PaymentsSearch";
import DownloadCsvButton from "../UiElements/DownloadCsvButton";

const PaymentsScreen = () => {
  const paymentsToFilter = useSelector(
    ({ payments }) => payments.paymentsToFilter
  );

  return (
    <div className="container mx-auto">
      <PaymentsSearch />
      <div className="flex justify-end mt-4">
        <DownloadCsvButton />
        <PaymentModal />
      </div>
      <div className="flex flex-col mt-6">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              <table className="min-w-full">
                <PaymentsHeader />
                <tbody className="bg-white">
                  {paymentsToFilter.length > 0 &&
                    paymentsToFilter.map((payment) => (
                      <PaymentsRow key={payment._id} payment={payment} />
                    ))}
                </tbody>
              </table>
              {paymentsToFilter.length === 0 && (
                <h3 className="text-center mx-auto bg-white py-7">
                  No hay registros para mostrar!
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsScreen;
