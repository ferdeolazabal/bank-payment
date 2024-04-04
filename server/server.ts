import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";

import { AppDataSource } from "./src/data-source";
import paymentsRoutes from "./src/routes/payments";
import usersRoutes from "./src/routes/users";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    payments: "/api/payments",
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    this.dbConnection();
    this.middlewares();
    this.routes();

    this.app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../server", "public", "index.html"));
    });
  }

  async dbConnection() {
    AppDataSource.initialize()
      .then(() => {
        console.log("Connection has been established successfully!");
      })
      .catch((error) =>
        console.log("Unable to connect to the database:", error)
      );
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, "../server", "public")));
  }

  routes() {
    this.app.use(this.apiPaths.payments, paymentsRoutes);
    this.app.use(this.apiPaths.users, usersRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
