import { Router } from "express";
import { getPayments, getPayment, postPayment } from "../controllers/payments";

const paymentsRoutes = Router();

paymentsRoutes.get("/", getPayments);
paymentsRoutes.get("/:id", getPayment);
paymentsRoutes.post("/", postPayment);

export default paymentsRoutes;
