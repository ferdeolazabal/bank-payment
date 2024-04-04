import { Router } from "express";
import { getUsers } from "../controllers/users";

const usersRoutes = Router();

usersRoutes.get("/", getUsers);

export default usersRoutes;
