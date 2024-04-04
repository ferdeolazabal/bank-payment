import { AppDataSource } from "../data-source";
import { Response, Request } from "express";
import Payment from "../domain/Payment";
import PaymentORMEntity from "../Infrastructure/Entities/PaymentsORMEntity";

const getPayments = async (req: Request, res: Response) => {
  try {
    const savedPayments = await AppDataSource.manager.find(PaymentORMEntity, {
      relations: ["user"],
    });

    const payments = savedPayments.map((pay) => Payment.fromValues(pay, {}));

    res.json({
      ok: true,
      payments,
    });
  } catch (e) {
    console.log({ e });
    res.status(500).json({
      ok: false,
      message: "Error al obtener total de pagos",
    });
  }
};

export { getPayments };
