import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./src/data-source";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    Payments: "/api/payments",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    this.dbConnection();
    this.middlewares();
    this.routes();
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
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.Payments, require("./src/routes/payments"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
