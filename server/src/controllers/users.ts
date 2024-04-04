import { AppDataSource } from "../data-source";
import { Response, Request } from "express";
import User from "../domain/User";
import UserORMEntity from "../Infrastructure/Entities/UserORMEntity";

const getUsers = async (req: Request, res: Response) => {
  try {
    const savedUsers = await AppDataSource.manager.find(UserORMEntity);
    const users = savedUsers.map((user) => User.fromValues(user));

    res.json({
      ok: true,
      users,
    });
  } catch (e) {
    console.log({ e });
    res.status(500).json({
      ok: false,
      message: "Error al obtener los usuarios registrados",
    });
  }
};

export { getUsers };
