import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import { sample_users } from "../data";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed Is Done!");
  })
);

// router.post("/login", (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user = sample_users.find(
//     (user) => user.email === email && user.password === password
//   );
//   if (user) {
//     console.log(generateTokenReponse(user));
//     res.send(generateTokenReponse(user));
//   } else {
//     const BAD_REQUSET = 400;
//     res.status(BAD_REQUSET).send("User name or password is not valid!");
//   }
// });

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json(generateTokenReponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  })
);

const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
  // user.token = token;
  // return user;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

// const generateTokenReponse = (user: User) => {
//   const token = jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     },
//     process.env.JWT_SECRET!,
//     {
//       expiresIn: "30d",
//     }
//   );

//   return {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     address: user.address,
//     isAdmin: user.isAdmin,
//     token: token,
//   };
// };

export default router;
