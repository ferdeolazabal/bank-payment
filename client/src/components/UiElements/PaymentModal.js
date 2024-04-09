// @ts-nocheck
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { httpPostPayment } from "../../redux/actions/payments";

const PaymentModal = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(({ auth }) => auth.user) || [];

  const [initialValues, setInitialValues] = useState({
    amount: "",
    type: "",
    receiver: "",
  });

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  let formikRef = null;

  const handleSubmit = (values) => {
    Object.assign(values, {
      amount: values.amount.toString().replace(/\./g, ""),
      user: authUser,
      status: "success",
    });
    dispatch(httpPostPayment(values));
  };

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Registrar Pago",
      showCancelButton: true,
      html: (
        <Formik
          innerRef={(ref) => (formikRef = ref)}
          initialValues={initialValues}
          validate={({ amount, type, receiver }) => {
            const errors = {};
            if (!amount) {
              errors.monto = "Monto requerido";
            }
            if (!type) {
              errors.tipo = "Tipo requerido";
            }
            if (!emailRegex.test(receiver)) {
              errors.receptor = "El destinatario debe ser un email";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="number"
              className="swal2-input"
              placeholder="Monto"
              name="amount"
              onKeyPress={(event) =>
                event.key === "Enter" && Swal.clickConfirm()
              }
            />

            <Field
              as="select"
              className="swal2-select"
              name="type"
              onKeyPress={(event) =>
                event.key === "Enter" && Swal.clickConfirm()
              }
            >
              <option value="">Tipo</option>
              <option value="creditCard">Tarjeta de crédito</option>
              <option value="wallet">Billetera vitual</option>
              <option value="bankTransfer">Transferencia bancaria</option>
            </Field>
            <Field
              type="email"
              className="swal2-input"
              placeholder="Email destinatario"
              name="receiver"
              onKeyPress={(event) =>
                event.key === "Enter" && Swal.clickConfirm()
              }
            />
          </Form>
        </Formik>
      ),
      didOpen: () => {
        Swal.getPopup()?.querySelector("input")?.focus();
        setInitialValues(initialValues);
      },
      preConfirm: async () => {
        await formikRef?.submitForm();
        if (formikRef?.isValid) {
          Swal.fire({
            title: "Pago Enviado!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        } else {
          Swal.showValidationMessage(JSON.stringify(formikRef?.errors));
        }
      },
    });
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={showSwal}
    >
      Registrar Pago
    </button>
  );
};

export default PaymentModal;
