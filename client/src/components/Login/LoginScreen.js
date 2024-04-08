// @ts-nocheck
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { startLogin, startRegister } from "../../redux/actions/auth";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rFirstName: "",
    rLastName: "",
    rEmail: "",
    rPassword1: "",
    rPassword2: "",
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rFirstName, rLastName, rEmail, rPassword1, rPassword2 } =
    formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword2) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    }
    dispatch(startRegister(rEmail, rPassword1, rFirstName, rLastName));
  };

  return (
    <div className="mx-auto flex items-center justify-center h-screen">
      <div className="flex flex-wrap">
        <div className="rounded-lg shadow-lg p-6">
          <h3 className="mb-4 text-center text-gray-700">Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="submit"
                className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 rounded-lg shadow-lg p-6 bg-blue-300">
          <h3 className="mb-4 text-center text-gray-700">Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                type="text"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Nombre"
                name="rFirstName"
                value={rFirstName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Apellido"
                name="rLastName"
                value={rLastName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Contraseña"
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="m-4">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
