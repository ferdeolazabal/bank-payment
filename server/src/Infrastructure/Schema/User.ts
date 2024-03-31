import { EntitySchema } from "typeorm";
import UserORMEntity from "../Entities/UserORMEntity";

const PaymentsSchema = new EntitySchema<UserORMEntity>({
  name: "User",
  target: UserORMEntity,
  tableName: "user",
  columns: {
    _id: {
      type: String,
      primary: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneMobile: {
      type: String,
      nullable: true,
    },
    password: {
      type: String,
    },
    enable: {
      type: Boolean,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      name: "createdAt",
      type: "timestamp with time zone",
      createDate: true,
    },
    updatedAt: {
      name: "updatedAt",
      type: "timestamp with time zone",
      updateDate: true,
    },
  },
});

export default PaymentsSchema;
