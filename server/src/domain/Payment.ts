import { v4 as uuidv4 } from "uuid";
import { SetValuesPayload } from "../TsHelper";
import IPaymentDomain from "../InterfaceAdapters/IDomain/IPaymentDomain";
import PaymentORMEntity from "../Infrastructure/Entities/PaymentsORMEntity";
import PaymentStatusEnum from "../Infrastructure/Enums/PaymentStatusEnum";
import PaymentTypeEnum from "../Infrastructure/Enums/PaymentTypeEnum";
import IUserDomain from "../InterfaceAdapters/IDomain/IUserDomain";
import User from "./User";

class Payment implements IPaymentDomain {
  private _id: string;

  amount: number;
  type: PaymentTypeEnum;
  status: PaymentStatusEnum;

  user: IUserDomain;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this._id = uuidv4();
  }

  getId(): string {
    return this._id;
  }

  getAmount(): number {
    return this.amount;
  }

  getPaymentType(): PaymentTypeEnum {
    return this.type;
  }

  getStatus(): PaymentStatusEnum {
    return this.status;
  }

  getUser(): IUserDomain {
    return this.user;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setValues(values: SetValuesPayload<Payment>): void {
    this.amount = values.amount ?? this.amount;
    this.type = values.type ?? this.type;
    this.status = values.status ?? this.status;
    this.user = values.user ?? this.user;
    this.createdAt = values.createdAt ?? this.createdAt;
    this.updatedAt = values.updatedAt ?? this.updatedAt;
  }

  static fromValues(
    values: PaymentORMEntity,
    config: { transformUser?: boolean }
  ): Payment {
    const { transformUser = true } = config;

    const payment = new Payment();
    const { _id, user, ...rest } = values;

    const transformedUser =
      transformUser && user ? User.fromValues(user) : null;

    payment._id = _id;
    payment.setValues({
      user: transformedUser,
      ...rest,
    });
    return payment;
  }
}

export default Payment;
