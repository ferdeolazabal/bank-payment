import { AppDataSource } from "../data-source";
import { generateJWT } from "../helpers/jwt";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";

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

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const savedUser = await AppDataSource.manager.findOne(UserORMEntity, {
      where: { _id: id },
    });
    const user = User.fromValues(savedUser);

    res.json({
      ok: true,
      user,
    });
  } catch (e) {
    console.log({ e });
    res.status(500).json({
      ok: false,
      message: "Error al obtener usuario",
    });
  }
};

// const postUser = async (req: Request, res: Response) => {
//   const { body } = req;

//   try {
//     const existeEmail = await AppDataSource.manager.findOne(UserORMEntity, {
//       where: {
//         email: body.email,
//       },
//     });

//     if (existeEmail) {
//       return res.status(400).json({
//         ok: false,
//         message: `El email ${body.email} ya está registrado`,
//       });
//     }

//     const user = new User();

//     const salt = bcrypt.genSaltSync();

//     user.firstName = body.firstName;
//     user.lastName = body.lastName;
//     user.email = body.email;
//     user.password = bcrypt.hashSync(body.password, salt);

//     user.enable = true;
//     user.isSuperAdmin = false;

//     // const newUser = await AppDataSource.manager.save(
//     const saveUser = await AppDataSource.manager.save(
//       new UserORMEntity(),
//       // new User(),
//       { data: user }
//     );
//     console.log("saveUser", { saveUser });
//     const newUser = User.fromValues(saveUser);

//     console.log("newUser", { newUser });

//     const token = await generateJWT(newUser.getId(), newUser.getFullName());

//     console.log("token", token);

//     res.json({
//       ok: true,
//       newUser,
//       token,
//     });
//   } catch (e) {
//     console.log({ e });
//     res.status(500).json({
//       ok: false,
//       message: "Error al guardar el usuario",
//     });
//   }
// };

export { getUsers, getUser };
