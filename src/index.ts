import env from "dotenv";
env.config();

import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler";
import auth from "./middlewares/auth";

import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";

import postRoutes from "./modules/post/post.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/user/auth", authRoutes);
app.use("/post", auth, postRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("💻 Server is running!");
});
