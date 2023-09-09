import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./router/food.router";
import orderRouter from "./router/order.router";
import userRouter from "./router/user.router";
import { dbConnect } from "./configs/database.config";

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:4200"],
//   })
// );
app.use(cors());

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Website served on http://localhost:${port}`);
});
