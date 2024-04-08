import { AppDataSource } from "../data-source";
import { Response, Request } from "express";
import Payment from "../domain/Payment";

const getPayments = async (req: Request, res: Response) => {
  try {
    const savedPayments = await AppDataSource.manager.find(Payment, {
      relations: ["user"],
    });

    const payments = savedPayments.map((pay) => Payment.fromValues(pay));

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

const getPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const savedPayment = await AppDataSource.manager.findOne(Payment, {
      relations: ["user"],
      where: { _id: id },
    });
    const payment = Payment.fromValues(savedPayment);

    res.json({
      ok: true,
      payment,
    });
  } catch (e) {
    console.log({ e });
    res.status(500).json({
      ok: false,
      message: "Error al obtener pago",
    });
  }
};

const postPayment = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const payment = new Payment();

    payment.setValues({
      amount: +body.amount,
      type: body.type,
      user: body.user,
      status: body.status,
      receiver: body.receiver,
    });

    const savedPayment = await AppDataSource.manager.save(payment);

    res.json({
      ok: true,
      savedPayment,
    });
  } catch (e) {
    console.log({ e });
    res.status(500).json({
      ok: false,
      message: "Error al guardar el pago",
    });
  }
};

export { getPayments, getPayment, postPayment };
