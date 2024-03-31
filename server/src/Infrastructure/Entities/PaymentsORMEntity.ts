import IPaymentDomain from "../../InterfaceAdapters/IDomain/IPaymentDomain";
import PaymentStatusEnum from "../Enums/PaymentStatusEnum";
import PaymentTypeEnum from "../Enums/PaymentTypeEnum";
import UserORMEntity from "./UserORMEntity";

export default class PaymentORMEntity {
  _id: string;

  amount: number;
  type: PaymentTypeEnum;
  status: PaymentStatusEnum;

  user: UserORMEntity;

  createdAt: Date;
  updatedAt: Date;

  static fromDomain(
    values: IPaymentDomain,
    config: { transformUser?: boolean }
  ) {
    const { transformUser = true } = config;
    const user = transformUser ? values.getUser() : null;

    const payment = new PaymentORMEntity();

    payment._id = values.getId();
    payment.amount = values.getAmount();
    payment.type = values.getPaymentType();
    payment.status = values.getStatus();
    payment.user = user ? UserORMEntity.fromDomain(user) : null;

    payment.createdAt = values.getCreatedAt();
    payment.updatedAt = values.getUpdatedAt();
  }
}
