import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "bank_payment",
  username: "postgres",
  password: "",
  dropSchema: false,
  // dropSchema: true,
  synchronize: true,
  migrationsRun: false,
  logging: false,
  entities: ["src/Infrastructure/Schema/*.ts"],
});
