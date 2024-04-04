import { Router } from "express";
import { getPayments } from "../controllers/payments";

const paymentsRoutes = Router();

paymentsRoutes.get("/", getPayments);

export default paymentsRoutes;
