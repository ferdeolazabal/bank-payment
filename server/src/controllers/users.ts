import { AppDataSource } from "../data-source";
import { generateJWT } from "../helpers/jwt";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";

import User from "../domain/User";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.manager.find(User);

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

    const user = await AppDataSource.manager.findOne(User, {
      where: { _id: id },
    });

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

const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await AppDataSource.manager.findOne(User, {
      where: {
        email: body.email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        message: `El email ${body.email} ya está registrado`,
      });
    }

    const user = new User();

    const salt = bcrypt.genSaltSync();

    const { firstName, lastName, email } = body;

    user.setValues({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(body.password, salt),
      enable: true,
      isSuperAdmin: false,
    });

    const newUser = await AppDataSource.manager.save(user);

    const token = await generateJWT(newUser.getId(), newUser.getFullName());

    res.json({
      ok: true,
      newUser,
      token,
    });
  } catch (e) {
    console.log({ e });
    res.status(500).json({
      ok: false,
      message: "Error al guardar el usuario",
    });
  }
};

export { getUsers, getUser, postUser };
