import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";

import { AppDataSource } from "./src/data-source";
import paymentsRoutes from "./src/routes/payments";
import usersRoutes from "./src/routes/users";
import authRoutes from "./src/routes/auth";
import User from "./src/domain/User";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
    users: "/api/users",
    payments: "/api/payments",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    this.dbConnection();
    this.middlewares();
    this.routes();

    this.app.get("/*", (req, res) => {
      res.sendFile("public/index.html", { root: __dirname });
      // res.sendFile(
      //   path.join(__dirname, "..", "public", "index.html")
      //   // path.join(__dirname, "../server", "public", "index.html")

      // );
    });
  }

  async dbConnection() {
    AppDataSource.initialize()
      .then(() => {
        console.log("Connection has been established successfully!");
        // const user = new User();

        // user.setValues({
        //   firstName: "john",
        //   lastName: "connor",
        //   email: "john@connor.com",
        //   password: "123456",
        //   enable: true,
        //   isSuperAdmin: false,
        // });
        // AppDataSource.manager.save(user);
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
    this.app.use(express.static(path.join(__dirname, "..", "public")));

    // this.app.use(
    //   express.static(path.join(__dirname, "../server", "public", "static"))
    // );
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.users, usersRoutes);
    this.app.use(this.apiPaths.payments, paymentsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
