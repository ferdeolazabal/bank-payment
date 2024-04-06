import { Router } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator";
import { getUsers, getUser, postUser } from "../controllers/users";

const usersRoutes = Router();

usersRoutes.get("/", getUsers);

usersRoutes.get("/:id", getUser);

usersRoutes.post(
  "/new",
  [
    check("firstName", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  postUser
);

export default usersRoutes;
