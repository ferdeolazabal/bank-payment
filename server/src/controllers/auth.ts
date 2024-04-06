import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source";
import { generateJWT } from "../helpers/jwt";

import User from "../domain/User";

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const findUser = await AppDataSource.manager.findOne(User, {
      where: { email },
    });

    if (!findUser) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    const user = User.fromValues(findUser);

    const checkValidPassword = bcrypt.compareSync(password, user.password);

    if (!checkValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generateJWT(user.getId(), user.getFullName());

    res.json({
      ok: true,
      uid: user.getId(),
      name: user.getFullName(),
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

// const revalidateToken = async (req: Request, res: Response) => {
//   const { id, name } = req.body;

//   try {
//     const token = await generateJWT(id, name);

//     const findUser = await AppDataSource.manager.findOne(UserORMEntity, {
//       where: { _id: id },
//     });

//     const user = User.fromValues(findUser);

//     res.json({
//       ok: true,
//       token,
//       id,
//       user,
//     });
//   } catch (e) {
//     console.log("Error al revalidar el token", { e });
//     res.status(500).json({
//       ok: false,
//       msg: "Por favor hable con el administrador",
//     });
//   }
// };

export { userLogin };
