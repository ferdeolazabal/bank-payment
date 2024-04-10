// @ts-nocheck
import React from "react";
import { useDispatch } from "react-redux";
import { exportPaymentsInCsv } from "../../redux/actions/payments";

const DownloadCsvButton = () => {
  const dispatch = useDispatch();

  const handleDownloadPaymentsInCsv = (e) => {
    e.preventDefault();
    dispatch(exportPaymentsInCsv());
  };
  return (
    <button
      onClick={handleDownloadPaymentsInCsv}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-3"
    >
      Descargar Csv
    </button>
  );
};

export default DownloadCsvButton;
